import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');
/**
 * Sends a change request for a suggestion.
 *
 * @async
 * @function postChangeRequest
 * @param {string} id - The ID of the suggestion to request changes for.
 * @param {string} eic - The ID of the editor-in-chief requesting the changes.
 * @param {string} change - The description of the requested change.
 * @returns {Promise<void>} A promise that resolves when the change request is submitted.
 * @route POST: /suggestion/:id/change-request
 * @file backend/src/routes/suggestion.routes.js
 */
export const postChangeRequest = async (id, eic, change) => {
    try {
        console.log(id, eic, change)
        await API.post(`/suggestion/${id}/change-request`, { eic, change })

    } catch (error) {
        log.error(error)
    }
}