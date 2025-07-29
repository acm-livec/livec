import { isArray } from 'lodash';

import { EditorStatic } from '@components/ui/editor-static';

export default function Page({ children = null, page }) {
    return (
        <div className="document--computer-science p-5">
            {page?.content?.length > 0 || isArray(page) ? (
                <EditorStatic value={page.content || page} />
            ) : (
                <PlaceHolderPage heading={page?.title || 'No Title'} />
            )}
            {children}
        </div>
    );
}

const PlaceHolderPage = ({ heading }) => {
    return (
        <>
            <h2>{heading}</h2>
            <p>
                <em>This section is currently under development.</em>
            </p>
            <hr />
            <h2>Overview</h2>
            <p>
                Content for <strong>Section Title Placeholder</strong> will be added soon. This page is reserved as a placeholder for upcoming
                curriculum material, including relevant headings, body text, examples, and references.
            </p>
            <hr />
            <h2>Planned Topics</h2>
            <ul>
                <li>Topic 1: To be defined</li>
                <li>Topic 2: To be defined</li>
                <li>Topic 3: To be defined</li>
            </ul>
            <hr />
            <h2>Contributing</h2>
            <p>If you would like to contribute to this section, please submit your suggestions or drafts through the appropriate channels.</p>
            <p>
                <em>Last updated: Insert Date</em>
            </p>
            <hr />
        </>
    );
};
