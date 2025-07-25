const fs = require('fs');
const path = require('path');

const inputFile = path.resolve(__dirname, 'codex.json');
const outputFile = path.resolve(__dirname, 'output.json');

const ORDERED_STYLES = [
  'decimal',
  'lower-alpha',
  'lower-roman',
  'upper-alpha',
  'upper-roman',
];

function transformNode(node) {
  let updated = { ...node };

  if (updated.listStyleType === 'disc') {
    const indent = updated.indent || 0;
    updated.listStyleType = ORDERED_STYLES[indent] || 'decimal';
  }

  if (Array.isArray(updated.children)) {
    updated.children = updated.children.map(transformNode);
  }

  return updated;
}

function transformSection(section) {
  const updated = { ...section };

  if (Array.isArray(updated.content)) {
    updated.content = updated.content.map(transformNode);
  }

  return updated;
}

try {
  const raw = fs.readFileSync(inputFile, 'utf-8');
  const sections = JSON.parse(raw);

  if (!Array.isArray(sections)) {
    throw new Error('Expected an array of section objects');
  }

  const transformed = sections.map(transformSection);

  fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2));
  console.log(`✅ Transformed file written to ${outputFile}`);
} catch (err) {
  console.error('❌ Error processing file:', err.message);
}
