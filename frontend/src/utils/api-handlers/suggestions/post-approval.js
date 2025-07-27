import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';
/**
 * Submits an editor-in-chief approval for a suggestion.
 *
 * @async
 * @function postEditorInChiefApproval
 * @param {string} id - The ID of the suggestion to approve.
 * @param {string} eicId - The ID of the editor-in-chief approving the suggestion.
 * @param {string} notes - Private notes regarding the approval.
 * @param {string} message - Public message to the submitter.
 * @returns {Promise<void>} A promise that resolves when the approval is submitted.
 * @route POST: /suggestion/:id/approve
 * @file backend/src/routes/suggestion.routes.js
 */
export const postEditorInChiefApproval = async (id, eicId, notes, message) => {
    try {
        log.debug('EIC approval', id, eicId, notes, message);
        await API.post(`/suggestion/${id}/approve`, { eicId, notes, message });
    } catch (error) {
        log.error(error);
    }
};
