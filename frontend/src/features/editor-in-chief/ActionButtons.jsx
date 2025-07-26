import { Button } from '@components/buttons';
import { EditorInChief } from './useEditorInChief';
import { FlexRow } from '@components/layouts/flex';

export default function ActionButtons({ setView, isActive }) {
    return (
        <FlexRow gap="1rem">
            <Button
                variant={'confirm'}
                text={'Approve'}
                onClick={() => setView(EditorInChief.APPROVE_CHANGE)}
                isActive={isActive(EditorInChief.APPROVE_CHANGE)}
            />
            <Button
                variant={'danger'}
                text={'Reject'}
                onClick={() => setView(EditorInChief.REJECT_CHANGE)}
                isActive={isActive(EditorInChief.REJECT_CHANGE)}
            />
            <Button
                variant={'info'}
                text={'Change Request'}
                onClick={() => setView(EditorInChief.SEND_CHANGE_REQUEST)}
                isActive={isActive(EditorInChief.SEND_CHANGE_REQUEST)}
            />
        </FlexRow>
    );
}
