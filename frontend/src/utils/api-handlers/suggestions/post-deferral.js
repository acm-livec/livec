import { API } from '@api/client.js';
import { logger } from '@utils/logger'


	/**
	 * Defers a suggestion to a reviewer, pausing associate editor decision until the reviewer completes.
	 *
	 * @async
	 * @function postDeferral
	 * @param {string} suggestionId - The ID of the suggestion to defer.
	 * @param {string} reviewerId - The ID of the reviewer the suggestion is deferred to.
	 * @returns {Promise<void>} A promise that resolves when the suggestion is deferred.
	 * @route POST: /suggestion/:id/defer
	 * @file backend/src/routes/suggestion.routes.js
	 */
	export const postDeferral = async (suggestionId, notes, mesage, reviewerId) => {
    try {
        await API.post(`/suggestion/${suggestionId}/defer`, {notes, mesage, reviewerId})
    } catch (error) {
        logger.error(error)
    }
}
