import styles from './Page.module.scss'
import { marked } from 'marked';
import { useEffect, useState } from 'react';



const getContent = async (page) => {
    if (page?.html) return page.html;
    if (page?.markdown_heading && page?.markdown_body) {
        return await marked.parse(page?.markdown_heading + ""+ page?.markdown_body);
    } else if (typeof page === "string") {
        return page
    }
    return null; 
};



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

    



    return (
        <div className={styles.page}>
            <div className='document--computer-science'>
                {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
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


