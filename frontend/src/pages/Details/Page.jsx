import styles from './Page.module.scss'


const placeholder = `
    <h1>[Section Title Placeholder]</h1>
        <p><em>This section is currently under development.</em></p>
    <hr>
        <h2>Overview</h2>
        <p>Content for <strong>[Section Title Placeholder]</strong> will be added soon. This page is reserved as a placeholder for upcoming curriculum material, including relevant headings, body text, examples, and references.</p>
    <hr>
    <h2>Planned Topics</h2>
        <ul>
            <li>Topic 1: To be defined</li>
            <li>Topic 2: To be defined</li>
            <li>Topic 3: To be defined</li>
        </ul>
    <hr>
        <h2>Contributing</h2>
        <p>If you would like to contribute to this section, please submit your suggestions or drafts through the appropriate channels.</p>
        <p><em>Last updated: [Insert Date]</em></p>
    <hr>
`

import { marked } from 'marked';



export default function Page({ children = null, page }) {

const pageContent = page?.html || marked.parse(page?.markdown_heading + "" + page?.markdown_body) || placeholder

    return (
        <div className={styles.page}>
            <div className={styles.markdown}>
                <div dangerouslySetInnerHTML={{ __html: pageContent }} />
            </div>
            {children}
        </div>
    )
}





