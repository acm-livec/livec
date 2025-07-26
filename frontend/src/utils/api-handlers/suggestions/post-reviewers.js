import { API } from '@api/client.js';
import { logger } from '@utils/logger';

/**
 * Assigns one or more reviewers to a suggestion.
 *
 * @async
 * @function postAssignReviewers
 * @param {string} suggestionId - The ID of the suggestion to assign reviewers to.
 * @param {Array<string>} reviewers - The IDs of the reviewers to assign.
 * @returns {Promise<void>} A promise that resolves when reviewers are assigned.
 * @route POST: /suggestion/:id/assign-reviewers
 * @file backend/src/routes/suggestion.routes.js
 */
export const postAssignReviewers = async (suggestionId, reviewers) => {
    try {
        console.log('hand:', suggestionId, reviewers);
        await API.post(`/suggestion/${suggestionId}/assign-reviewers `, {
            reviewers,
        });
    } catch (error) {
        logger.error(error);
    }
};
