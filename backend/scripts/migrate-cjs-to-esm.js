#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import recast from 'recast';
import { parse } from '@babel/parser';
import * as types from '@babel/types';

// Parser configuration supporting modern syntax
const parser = {
  parse(source) {
    return parse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'classProperties',
        'decorators-legacy',
        'dynamicImport',
        'importMeta'
      ]
    });
  }
};

/**
 * Adjust relative import paths by adding .js or /index.js extensions when needed
 */
function fixImportValue(rawValue, filePath) {
  if (!rawValue.startsWith('.')) return rawValue;
  let newValue = rawValue;
  const abs = path.resolve(path.dirname(filePath), rawValue);
  if (fs.existsSync(abs + '.js')) {
    newValue = rawValue + '.js';
  } else if (fs.existsSync(path.join(abs, 'index.js'))) {
    newValue = rawValue + '/index.js';
  }
  return newValue;
}

/**
 * Transform AST: require->import, module.exports->export, adjust import extensions
 */
function transform(ast, filePath) {
  recast.types.visit(ast, {
    visitCallExpression(path) {
      const { node } = path;
      if (
        types.isIdentifier(node.callee, { name: 'require' }) &&
        node.arguments.length === 1 &&
        types.isStringLiteral(node.arguments[0])
      ) {
        const raw = node.arguments[0].value;
        const sourceValue = fixImportValue(raw, filePath);
        const parent = path.parentPath.node;
        if (types.isVariableDeclarator(parent)) {
          const id = parent.id;
          let specifiers = [];
          if (types.isObjectPattern(id)) {
            specifiers = id.properties.map(prop =>
              types.importSpecifier(prop.value, prop.key)
            );
          } else {
            specifiers = [types.importDefaultSpecifier(id)];
          }
          const importDecl = types.importDeclaration(
            specifiers,
            types.stringLiteral(sourceValue)
          );
          path.parentPath.parentPath.replace(importDecl);
        } else if (types.isExpressionStatement(path.parentPath.node)) {
          const importDecl = types.importDeclaration(
            [],
            types.stringLiteral(sourceValue)
          );
          path.parentPath.replace(importDecl);
        }
        return false;
      }
      this.traverse(path);
    },
    visitAssignmentExpression(path) {
      const { node } = path;
      if (
        types.isMemberExpression(node.left) &&
        types.isIdentifier(node.left.object, { name: 'module' }) &&
        types.isIdentifier(node.left.property, { name: 'exports' })
      ) {
        const rhs = node.right;
        const decls = [];
        if (types.isObjectExpression(rhs)) {
          const specs = rhs.properties
            .filter(prop => types.isProperty(prop) && types.isIdentifier(prop.key))
            .map(prop => {
              const key = prop.key.name;
              const val = prop.value;
              if (types.isIdentifier(val) && val.name === key) {
                return types.exportSpecifier(types.identifier(key), types.identifier(key));
              } else if (types.isIdentifier(val)) {
                return types.exportSpecifier(types.identifier(val.name), types.identifier(key));
              }
              return null;
            })
            .filter(Boolean);
          decls.push(types.exportNamedDeclaration(null, specs));
        } else {
          decls.push(types.exportDefaultDeclaration(rhs));
        }
        path.parentPath.replace(...decls);
        return false;
      }
      this.traverse(path);
    },
    visitImportDeclaration(path) {
      const val = path.node.source.value;
      if (typeof val === 'string' && val.startsWith('.') && !val.match(/\.[jt]sx?$/)) {
        path.node.source.value = fixImportValue(val, filePath);
      }
      this.traverse(path);
    }
  });
}

/**
 * Read, parse, transform, and write back a JS file
 */
async function processFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = recast.parse(code, { parser });
  } catch (err) {
    console.error(`Skipping ${filePath}: parse error: ${err.message}`);
    return;
  }
  try {
    transform(ast, filePath);
    const output = recast.print(ast).code;
    fs.writeFileSync(filePath, output, 'utf8');
    console.log('Migrated:', filePath);
  } catch (err) {
    console.error(`Failed to transform ${filePath}: ${err.message}`);
  }
}

/**
 * Recursively walk directory, processing .js files (except node_modules and scripts)
 */
async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'scripts') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      await processFile(full);
    }
  }
}

(async () => {
  await walk('.');
})();