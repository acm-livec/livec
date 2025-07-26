import { diffArrays } from 'diff';
import { EditorStatic } from '@components/ui/editor-static';

export default function DiffViewer({ original = [], revised = [] }) {
    const parseNodes = (data) => {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch {
                // eslint-disable-next-line no-console
                console.error('DiffViewer: failed to parse JSON nodes');
                return [];
            }
        }
        return data;
    };

    const oldNodes = parseNodes(original);
    const newNodes = parseNodes(revised);
    const parts = diffArrays(oldNodes, newNodes, {
        comparator: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    });
    return (
        <div className="document--computer-science p-5">
            {parts.map((part, i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: part.added
                            ? '#d4ffd4'
                            : part.removed
                              ? '#ffd4d4'
                              : 'transparent',
                    }}
                >
                    <EditorStatic value={part.value} />
                </div>
            ))}
        </div>
    );
}
