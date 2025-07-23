import { API } from '@api/client.js';
import { logger } from '@utils/logger'


/**
 * Rejects a suggestion, providing reasons and an optional message to the submitter.
 *
 * @async
 * @function postRejection
 * @param {string} suggestionId - The ID of the suggestion to reject.
 * @param {string} rejectedBy - The ID of the user rejecting the suggestion.
 * @param {string} reasonForRejection - The reason for rejecting the suggestion.
 * @param {string} messageToSubmitter - Public message to the submitter.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating rejection success.
 * @route POST: /suggestion/:id/reject
 * @file backend/src/routes/suggestion.routes.js
 */
export const postRejection = async (suggestionId, rejectedBy, reasonForRejection, messageToSubmitter) => {

    try {
        const response = await API.post(`/suggestion/${suggestionId}/reject`, { 
            rejectedBy, reasonForRejection, messageToSubmitter 
        })

        const { success, message } = response.data
        logger.success(message)
        return success
        
    } catch (error) {
        logger.error(error)
    }
}