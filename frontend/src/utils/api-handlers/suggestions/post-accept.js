import { API } from '@api/client.js';
import { logger } from '@utils/logger'



/**
 * Initiates the review process for a suggestion.
 *
 * @async
 * @function postStartReview
 * @param {string} suggestionId - The ID of the suggestion to start review for.
 * @param {string} startedBy - The ID of the user starting the review.
 * @param {string} notes - Private notes for the reviewer.
 * @param {string} messageToSubmitter - Public message to the submitter.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating success.
 * @route POST: /suggestion/:id/start-review
 * @file backend/src/routes/suggestion.routes.js
 */
export const postStartReview = async (suggestionId, startedBy, notes, messageToSubmitter) => {
    try {
        const response = await API.post(`/suggestion/${suggestionId}/start-review`, { startedBy, notes, messageToSubmitter })
        const { success, message } = response.data
        logger.success(message)
        return success
    } catch (error) {
        logger.error(error)
    }
}
