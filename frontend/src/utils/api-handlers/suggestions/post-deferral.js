import { API } from '@api/client.js';
import { logger } from '@utils/logger'


/**
 * 
 * Defers a suggestion to a reviewer.
 * 
 * This is different from assigning reviewers as the Associate Editor
 * will have to wait for the Reviewer to finish up their review before they
 * can make their final decision.
 * 
 * @param {string} suggestionId 
 * @param {string} reviewerId 
 * @returns {Promise<void>}
 * 
 * 
 * @route POST: /suggestion/:id/defer
 * @file backend/src/routes/suggestion.routes.js
 * 
 */
export const postDeferral = async (suggestionId, reviewerId) => {
    try {
        await API.post(`/suggestion/${suggestionId}/defer`, {suggestionId, reviewerId})
    } catch (error) {
        logger.error(error)
    }
}
