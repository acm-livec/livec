import { AssociateEditor } from './useAssociateEditor';
import { Button } from '@components/buttons';

export default function ActionButtons({ setView, isActive }) {
    return (
        <>
            <Button
                variant={'confirm'}
                text={'Start Review'}
                onClick={() => setView(AssociateEditor.START_REVIEW)}
                isActive={isActive(AssociateEditor.START_REVIEW)}
            />
            <Button
                variant={'danger'}
                text={'Desk Reject'}
                onClick={() => setView(AssociateEditor.DESK_REJECT)}
                isActive={isActive(AssociateEditor.DESK_REJECT)}
            />
            <Button
                variant={'info'}
                text={'Defer to Reviewer'}
                onClick={() => setView(AssociateEditor.DEFER_TO_REVIEWER)}
                isActive={isActive(AssociateEditor.DEFER_TO_REVIEWER)}
            />
        </>
    );
}
