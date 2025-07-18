import { API } from '@api/client.js';
import { logger } from '@utils/logger'


/**
 * Assigns a single or multiple reviewers to a suggestion.
 * 
 * This is different from defering a suggestion to a Reviewer
 * as the Associate Editor can make their final decision without having
 * to wait for the Reviewers.
 * 
 * @param {string} suggestionId 
 * @param {Array<string>} reviewers 
 * @returns {Promise<void>}
 * 
 * @route POST: /suggestion/:id/assign-reviewers 
 * @file backend/src/routes/suggestion.routes.js
 * 
 */
export const postAssignReviewers = async (suggestionId, reviewers) => {
    try {
        await API.post(`/suggestion/${suggestionId}/assign-reviewers `, {reviewers})
    } catch (error) {
        logger.error(error)
    }
}
