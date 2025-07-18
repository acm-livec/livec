import { Button } from "@components/buttons"
import {EditorInChief} from './useEditorInChief';
import { FlexRow } from "@components/layouts/flex";


export default function ActionButtons ({ setView, isActive }) {
    return (
        <FlexRow gap="1rem">
            <Button variant={'confirm'} text={'Approve'} onClick={() => setView(EditorInChief.APPROVED_BY_EDITOR_IN_CHIEF)} isActive={isActive(EditorInChief.APPROVED_BY_EDITOR_IN_CHIEF)} />
            <Button variant={'danger'} text={'Reject'} onClick={() => setView(EditorInChief.REJECTED_BY_EDITOR_IN_CHIEF)} isActive={isActive(EditorInChief.REJECTED_BY_EDITOR_IN_CHIEF)} />
            <Button variant={'info'} text={'Change Request'} onClick={() => setView(EditorInChief.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF)} isActive={isActive(EditorInChief.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF)} />
        </FlexRow>
    )
}