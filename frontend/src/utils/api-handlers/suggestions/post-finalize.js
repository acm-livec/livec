import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

/**
 * Finalizes a suggestion review by the associate editor.
 *
 * @async
 * @function postAssociateEditorFinalization
 * @param {string} associateEditor - The ID of the associate editor finalizing the suggestion.
 * @param {string} suggestionId - The ID of the suggestion to finalize.
 * @param {string} updatedSection - The finalized content of the suggestion section.
 * @returns {Promise<void>} A promise that resolves when the suggestion is finalized.
 * @route POST: /suggestion/:id/finalize
 * @file backend/src/routes/suggestion.routes.js
 */
export const postAssociateEditorFinalization = async (
    associateEditor,
    suggestionId,
    updatedSection
) => {
    try {
        const response = await API.post(`/suggestion/${suggestionId}/finalize`, {
            associateEditor,
            updatedSection,
        });
        const { success, message } = response.data;
        log.success(message);
        return success;
    } catch (error) {
        log.error(error);
    }
};
