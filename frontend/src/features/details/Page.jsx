import styles from './Page.module.scss'
import { marked } from 'marked';
import { useEffect, useState } from 'react';



const getContent = async (page) => {
    console.log(page)
    if (page?.content) return page; // ✅ return JSON
    if (page?.html) return page.html;       // ✅ HTML string
    if (page?.markdown_heading && page?.markdown_body) {
        return await marked.parse(page.markdown_heading + page.markdown_body); // ✅ Markdown to HTML
    }
    if (typeof page === 'string') return page;
    return null;
};

const renderList = (items, type = 'ul', depth = 0) => {
    const ListTag = type;
    const className = `${type}-list depth-${depth}`;

    return (
        <ListTag className={className} style={{ paddingLeft: `${1.5 * (depth + 1)}rem` }}>
            {items.map((item, idx) => {
                if (typeof item === 'string') {
                    return <li key={idx}>{item}</li>;
                }

                if (typeof item === 'object' && item.text) {
                    return (
                        <li key={idx}>
                            {item.text}
                            {item.subitems && (
                                // Optionally switch type by depth, e.g. alternate ul/ol
                                renderList(item.subitems, type, depth + 1)
                            )}
                        </li>
                    );
                }

                return null;
            })}
        </ListTag>
    );
};


const CurriculumSection = ({ page }) => {
    return (
        <section style={{ marginBottom: '2rem' }}>
            <h2>{page?.title || 'none'}</h2>
            {page.content.map((block, index) => {
                if (block.type.toLowerCase() === 'heading') {
                    const Tag = `h${block.level || 2}`;
                    return <Tag key={index}>{block.text}</Tag>;
                }

                if (block.type.toLowerCase() === 'paragraph') {
                    return <p key={index}>{block.text}</p>;
                }

                if (block.type.toLowerCase() === 'list') {
                    // Choose between 'ul' or 'ol'; here we default to 'ul'
                    const listType = block.listType || 'ul'; // can override via block
                    return <div key={index}>{renderList(block.items, listType)}</div>;
                }
                if (['cs-core', 'ka-core', 'non-core', 'illustrative-learning-outcomes', 'professional-dispositions'].includes(block.type.toLowerCase())) {
                    // Choose between 'ul' or 'ol'; here we default to 'ul'
                    const listType = block.listType || 'ol'; // can override via block
                    return <div key={index}>{renderList(block.items, listType)}</div>;
                }

                return null;
            })}
        </section>
    );
};


import { FlexColumn } from '@components/layouts/flex';


export default function Page({ children = null, page }) {
    const [pageContent, setContent] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            const html = await getContent(page);
            setContent(html);
        };
        loadContent();
    }, [page]);

    useEffect(() => {
        // console.log("Page:", page, "Content:", pageContent)
    }, [pageContent]);

    const isJsonObject = typeof pageContent === 'object' && pageContent !== null && !Array.isArray(pageContent);
    const isHtmlString = typeof pageContent === 'string';

    console.log(isJsonObject)

    return (
        <div className={styles.page}>
            {/* <div  className='parent-heading'>
                <h1>{page?.meta?.parent_heading && page?.meta?.parent_heading}</h1>
            </div> */}

                <div className="document--computer-science">
                    {isJsonObject && <CurriculumSection page={pageContent} />}
                    {isHtmlString && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
                    {!pageContent && <PlaceHolderPage heading={page?.title || "No Title"} />}
                </div>
                {children}
        </div>
    )
}


const PlaceHolderPage = ({ heading }) => {
    return (
        <>
            <h1>{heading}</h1>
            <p><em>This section is currently under development.</em></p>
            <hr />
            <h2>Overview</h2>
            <p>Content for <strong>Section Title Placeholder</strong> will be added soon. This page is reserved as a placeholder for upcoming curriculum material, including relevant headings, body text, examples, and references.</p>
            <hr />
            <h2>Planned Topics</h2>
            <ul>
                <li>Topic 1: To be defined</li>
                <li>Topic 2: To be defined</li>
                <li>Topic 3: To be defined</li>
            </ul>
            <hr />
            <h2>Contributing</h2>
            <p>If you would like to contribute to this section, please
                submit your suggestions or drafts through the appropriate channels.</p>
            <p><em>Last updated: Insert Date</em></p>
            <hr />
        </>
    )
}


