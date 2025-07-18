import { useState, useEffect } from 'react';
import Accordion from '@components/Accordion';


export default function TableOfContents({ jumpToPage, tableOfContents }) {


    const annotateWithPageRanges = (items) => {
        return items.map(item => {
            const hasChildren = item.units && item.units.length > 0;

            if (!hasChildren) {
                return { ...item }; // return as-is
            }

            // Recursively annotate children first
            const annotatedChildren = annotateWithPageRanges(item.units);

            // Get all page numbers from children
            const childPages = [];
            const collectPages = (units) => {
                units.forEach(u => {
                    if (u.page_number != null) childPages.push(u.page_number);
                    if (u.units && u.units.length > 0) collectPages(u.units);
                });
            };
            collectPages(annotatedChildren);

            const start = Math.min(...childPages);
            const end = Math.max(...childPages);

            return {
                ...item,
                units: annotatedChildren,
                range: { start, end }
            };
        });
    };

    const [headings, setHeadings] = useState(annotateWithPageRanges(tableOfContents));



    const bg = {
        '0': 'second',
        '1': 'third'
    }

    // render TOC recursively
    const renderHeadings = (items, level = 0) => (
        <ul className='table-of-contents'>
            {items.map((item, idx) => {
                const hasChildren = item.units && item.units.length > 0;
                return (
                    <li
                        key={idx}
                        className={`${!hasChildren ? 'toc-item' : ''} indented `}
                        style={{ '--indent-level': level}}
                    >
                        {hasChildren ? (
                            <Accordion
                                css={bg[String(level)] || ''}
                                item={item}
                                content={renderHeadings(item.units, level + 1)}
                            />
                        ) : (
                            <div
                                className="toc-leaf"
                                onClick={() => {console.log(item); jumpToPage(item)}}
                            >
                                {item.title}
                                {item.page_number != null && (
                                    <span className="page-number">Page {item.page_number}</span>
                                )}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );


    return (
        <>
            {renderHeadings(headings)}
        </>
    )
}
