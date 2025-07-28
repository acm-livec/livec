import React, { useMemo } from 'react';
import Accordion from '@components/Accordion';

export default function TableOfContents({ jumpToPage, tableOfContents, showPdf, jumpToPdf }) {
    // Annotate nested sections with page ranges for accordion headers
    const annotateWithRanges = (items) =>
        items.map((item) => {
            const hasChildren = item.units && item.units.length > 0;
            if (!hasChildren) {
                return { ...item };
            }
            const children = annotateWithRanges(item.units);
            const pages = [];
            const collect = (list) => {
                list.forEach((node) => {
                    if (node.page_number != null) pages.push(node.page_number);
                    if (node.units && node.units.length) collect(node.units);
                });
            };
            collect(children);
            const start = Math.min(...pages);
            const end = Math.max(...pages);
            return { ...item, units: children, range: { start, end } };
        });

    // Build a level-based nested tree from flat list
    const buildNested = (items) => {
        const root = [];
        const stack = [{ level: 0, children: root }];
        items.forEach((item) => {
            const node = { ...item, units: [] };
            while (stack.length && item.level <= stack[stack.length - 1].level) {
                stack.pop();
            }
            stack[stack.length - 1].children.push(node);
            stack.push({ level: item.level, children: node.units });
        });
        return root;
    };

    const bg = { 0: 'second', 1: 'third' };

    const nested = useMemo(() => buildNested(tableOfContents), [tableOfContents]);

    const renderItems = (items) => (
        <ul className="table-of-contents">
            {items.map((item) => {
                const hasChildren = item.units && item.units.length > 0;
                return (
                    <li key={item.id} className={`indented ${!hasChildren ? 'toc-item' : ''}`} style={{ '--indent-level': item.level - 1 }}>
                        {hasChildren ? (
                            <Accordion css={bg[String(item.level - 1)] || ''} item={item} content={renderItems(item.units)} />
                        ) : (
                            <div
                                className="toc-leaf"
                                onClick={() => {
                                    jumpToPdf(item.page_number - 1);
                                    jumpToPage(item);
                                }}
                            >
                                {item.title}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return renderItems(nested);
}
