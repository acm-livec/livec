import { useContext } from 'react';
import {
    postEditorInChiefApproval,
    postChangeRequest,
    postRejection,
    postDiscussion,
} from '@utils/api-handlers/suggestions';
import { UserContext } from '@context/UserProvider';
import { logger } from '@utils/logger';
const log = logger.create('useEditorInChief.js');
import { EditorInChiefActions } from '@docs/constants/actions';
import { postVersion } from '@utils/api-handlers/curriculums/post-version';

export const EditorInChief = EditorInChiefActions;

export default function useEditorInChief() {
    const { user } = useContext(UserContext);
    const editorInChiefId = user.id;

    /**
     * Approves a suggestion as editor-in-chief with private and public messages.
     *
     * @async
     * @function approveSuggestion
     * @param {string} suggestionId - The ID of the suggestion to approve.
     * @param {{forPrivate: string, forPublic: string}} formData - Approval details.
     * @param {string} formData.forPrivate - Private notes regarding approval.
     * @param {string} formData.forPublic - Public message to the submitter.
     * @returns {Promise<void>} A promise resolving when the approval is submitted.
     */
    const approveSuggestion = async (suggestionId, formData) => {
        try {
            log.startProcess('Approve Suggestion');
            const { forPrivate, forPublic } = formData;
            log.debug({ suggestionId, editorInChiefId, forPrivate, forPublic });
            await postEditorInChiefApproval(
                suggestionId,
                editorInChiefId,
                forPrivate,
                forPublic
            );
            log.success('Suggestion approved:', { suggestionId });
        } catch (error) {
            log.error(error);
        } finally {
            log.endProcess();
        }
    };

    /**
     * Sends a change request for a suggestion as editor-in-chief.
     *
     * @async
     * @function sendChangeRequest
     * @param {string} suggestionId - The ID of the suggestion for change request.
     * @param {{forPrivate: string}} formData - Change request details.
     * @param {string} formData.forPrivate - Description of requested changes.
     * @returns {Promise<void>} A promise resolving when the change request is submitted.
     */
    const sendChangeRequest = async (suggestionId, formData) => {
        try {
            log.startProcess('Send Change Request');
            const { forPrivate } = formData;
            log.debug({ suggestionId, editorInChiefId, forPrivate });
            await postChangeRequest(suggestionId, editorInChiefId, forPrivate);
            log.success('Change request sent for suggestion:', {
                suggestionId,
            });
        } catch (error) {
            log.error(error);
        } finally {
            log.endProcess();
        }
    };

    /**
     * Rejects a suggestion with private and public messages as editor-in-chief.
     *
     * @async
     * @function reject
     * @param {string} suggestionId - The ID of the suggestion to reject.
     * @param {{forPrivate: string, forPublic: string}} params - Rejection details.
     * @param {string} params.forPrivate - Private reason for rejection.
     * @param {string} params.forPublic - Public message to the submitter.
     * @returns {Promise<boolean>} A promise resolving to a boolean indicating success.
     */
    const reject = async (suggestionId, { forPrivate, forPublic }) => {
        try {
            log.startProcess('Reject Suggestion');
            log.debug({ suggestionId, editorInChiefId, forPrivate, forPublic });
            const success = await postRejection(
                suggestionId,
                editorInChiefId,
                forPrivate,
                forPublic
            );
            log.success('Suggestion rejected:', { suggestionId, success });
            return success;
        } catch (error) {
            log.error(error);
            return false;
        } finally {
            log.endProcess();
        }
    };

    const startDiscussion = async (suggestionId) => {
        try {
            log.startProcess('Publish Version');
            await postDiscussion(suggestionId, editorInChiefId);
            log.success('Version published');
        } catch (error) {
            log.error(error);
        }
    };

    const publishVersion = async (versionData) => {
        try {
            log.startProcess('Publish Version');
            await postVersion(user.discipline, versionData);
            log.success('Version published');
        } catch (error) {
            log.error(error);
        } finally {
            log.endProcess();
        }
    };

    return {
        approveSuggestion,
        sendChangeRequest,
        reject,
        publishVersion,
        startDiscussion,
    };
}
