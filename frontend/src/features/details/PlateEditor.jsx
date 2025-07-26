import { Plate, usePlateEditor } from 'platejs/react';

import { Editor, EditorContainer } from '@components/ui/editor';
import { useState, useEffect } from 'react';
import { FlexColumn } from '@components/layouts/flex';
import { ListKit } from '@components/editor/plugins/list-kit';
import { BaseEditorKit } from '@components/editor/editor-base-kit';
import { FixedToolbarKit } from '@components/editor/plugins/fixed-toolbar-kit';
import { Button } from '@components/buttons';

export default function PlateEditor({
    content = [],
    LOCAL_STORAGE_KEY,
    action,
}) {
    const editor = usePlateEditor({
        plugins: [...BaseEditorKit, ...ListKit, ...FixedToolbarKit],
        value: () => {
            const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedValue ? JSON.parse(savedValue) : content;
        },
    });

    //   const [initialValue, setInitialValue] = useState(content);

    const handlePrint = () => {
        if (editor) {
            console.log('Current Editor Content:', editor.children);
            alert('Content logged to console as JSON');
        }
    };

    return (
        <Plate
            editor={editor}
            onChange={({ value }) => {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
            }}
        >
            {/* <FlexColumn className='document--computer-science'> */}
            <EditorContainer>
                <Editor variant="none" placeholder="Start typing..." />
            </EditorContainer>
            {action && <Button onClick={action} text="Post" />}
            {/* </FlexColumn> */}
        </Plate>
    );
}
