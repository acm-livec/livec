import React from 'react';
import { EditorStatic } from '@components/ui/editor-static';
export default function Documentation({ html }) {
    if (!html) return;
    return <EditorStatic variant="none" value={html} />;
}
