#!/usr/bin/env node
"use strict";
// Simple in-place transform: CommonJS -> ESM in backend/src/features
// Usage: node scripts/transform-cjs-to-esm.js
const fs = require("fs");
const path = require("path");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((ent) => {
    const res = path.resolve(dir, ent.name);
    return ent.isDirectory() ? walk(res) : res;
  });
}

function transform(content) {
  let out = content;
  // const {a, b} = require('x');
  out = out.replace(/const \{([^}]+)\} = require\(['"](.+?)['"]\);?/g,
    (m, names, src) => `import { ${names.trim()} } from '${src}.js';`);
  // const foo = require('x');
  out = out.replace(/const (\w+) = require\(['"](.+?)['"]\);?/g,
    (m, def, src) => `import ${def} from '${src}.js';`);
  // module.exports = foo;
  out = out.replace(/module\.exports = (\w+);?/g,
    (m, id) => `export default ${id};`);
  // exports.foo = bar;
  out = out.replace(/exports\.(\w+) = (\w+);?/g,
    (m, name, id) => `export const ${name} = ${id};`);
  return out;
}

function main() {
  const root = path.resolve(__dirname, "../backend/src/features");
  const files = walk(root).filter((f) => f.endsWith('.js'));
  files.forEach((file) => {
    const src = fs.readFileSync(file, 'utf8');
    const dst = transform(src);
    if (dst !== src) {
      fs.writeFileSync(file, dst, 'utf8');
      console.log(`Transformed ${path.relative(process.cwd(), file)}`);
    }
  });
}

if (require.main === module) {
  main();
}
