#!/usr/bin/env node
/*
 * Script to transform codex_test.json content arrays to Slate-compatible format.
 * Replaces 'text' property with 'children' arrays and converts list blocks.
 * Runs in-place on codex_test.json in current directory.
 */

const fs = require('fs');
const filePath = './codex_test.json';

function convertItems(items) {
    const nodes = [];
    for (const item of items) {
        if (typeof item === 'string') {
            nodes.push({ type: 'list-item', children: [{ text: item }] });
        } else if (typeof item === 'object' && item !== null) {
            const children = [{ text: item.text || '' }];
            if (Array.isArray(item.subitems)) {
                const subnodes = convertItems(item.subitems);
                children.push({ type: 'bulleted-list', children: subnodes });
            }
            nodes.push({ type: 'list-item', children });
        }
    }
    return nodes;
}

function transformContent(content) {
    const newBlocks = [];
    for (const block of content) {
        if (block.items) {
            const originalType = block.type;
            const newBlock = { type: 'bulleted-list' };
            if (originalType !== 'list') {
                newBlock.label = originalType;
            }
            newBlock.children = convertItems(block.items);
            newBlocks.push(newBlock);
        } else if (block.text) {
            const blockType = block.type ? block.type.toLowerCase() : 'paragraph';
            const newBlock = { type: blockType };
            if (block.level !== undefined) {
                newBlock.level = block.level;
            }
            newBlock.children = [{ text: block.text }];
            newBlocks.push(newBlock);
        } else {
            newBlocks.push(block);
        }
    }
    return newBlocks;
}

/**
 * Parse the HTML string for Definitions & Terminology (id 8238a7d96075)
 * into Slate-compatible blocks: heading, paragraphs, and code blocks.
 */
function parseDefinitionsHtml(html) {
    const sections = [];
    // Heading level 2
    const h2 = html.match(/<h2>(.*?)<\/h2>/);
    if (h2) {
        sections.push({ type: 'heading', level: 2, children: [{ text: h2[1] }] });
    }
    // Paragraphs and code blocks
    const pRegex = /<p>([\s\S]*?)<\/p>/g;
    let m;
    while ((m = pRegex.exec(html)) !== null) {
        const inner = m[1];
        const codeMatch = inner.match(/^<code>([\s\S]*?)<\/code>$/);
        if (codeMatch) {
            sections.push({ type: 'code', children: [{ text: codeMatch[1] }] });
        } else {
            const text = inner.replace(/<strong>(.*?)<\/strong>/g, '$1');
            sections.push({ type: 'paragraph', children: [{ text }] });
        }
    }
    return sections;
}

(function main() {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const transformed = data.map(item => {
        // Transform existing content blocks
        if (item.content) {
            item.content = transformContent(item.content);
        }
        // Special-case: parse html into content for Definitions & Terminology block
        if (item.id === '8238a7d96075' && item.html) {
            item.content = parseDefinitionsHtml(item.html);
            delete item.html;
        }
        // Replace any html prop with empty content array if no content exists
        else if (Object.prototype.hasOwnProperty.call(item, 'html') && !item.content) {
            delete item.html;
            item.content = [];
        }
        return item;
    });
    fs.writeFileSync(filePath, JSON.stringify(transformed, null, 4), 'utf8');
    console.log('codex_test.json has been updated to Slate format.');
})();