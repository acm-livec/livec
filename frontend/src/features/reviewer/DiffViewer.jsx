import { diffWords } from 'diff';

const nodesToText = (nodes = []) => {
    return nodes.map(n => {
        if (typeof n === 'string') return n;
        if (n.text) return n.text;
        if (Array.isArray(n.children)) return nodesToText(n.children).join('');
        return '';
    }).join('');
};

export default function DiffViewer({ original = [], revised = [] }) {
    const oldText = nodesToText(original);
    const newText = nodesToText(revised);
    const parts = diffWords(oldText, newText);
    return (
        <p>
            {parts.map((part, i) => (
                <span key={i} style={{ backgroundColor: part.added ? '#d4ffd4' : part.removed ? '#ffd4d4' : 'transparent' }}>
                    {part.value}
                </span>
            ))}
        </p>
    );
}
