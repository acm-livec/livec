import { useContext } from 'react';
import {
    postEditorInChiefApproval,
    postChangeRequest,
    postRejection,
    postDiscussion,
} from '@utils/api-handlers/suggestions';
import { UserContext } from '@context/UserProvider';
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
            const { forPrivate, forPublic } = formData;
            const success = await postEditorInChiefApproval(
                suggestionId,
                editorInChiefId,
                forPrivate,
                forPublic
            );
            return success;
        } catch (error) {
            return false;
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
            const { forPrivate } = formData;
            const success = await postChangeRequest(
                suggestionId,
                editorInChiefId,
                forPrivate
            );
            return success;
        } catch (error) {
            return false;
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
            const success = await postRejection(
                suggestionId,
                editorInChiefId,
                forPrivate,
                forPublic
            );
            return success;
        } catch (error) {
            return false;
        }
    };

    const startDiscussion = async (suggestionId) => {
        try {
            const success = await postDiscussion(suggestionId, editorInChiefId);
            return success;
        } catch (error) {
            // ignore
            return false;
        }
    };

    const publishVersion = async (versionData) => {
        try {
            await postVersion(user.discipline, changeSets);
        } catch (error) {
            // ignore
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
