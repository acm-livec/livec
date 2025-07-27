import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postDiscussion.js');
/**
 * Submits an editor-in-chief approval for a suggestion.
 *
 * @async
 * @function postDecision
 * @param {string} id - The ID of the suggestion to approve.
 * @param {string} eicId - The ID of the editor-in-chief approving the suggestion.
 * @route POST: /suggestion/:id/approve
 * @file backend/src/routes/suggestion.routes.js
 */
export const postDecision = async (id, eicId,) => {
    try {
        log.debug('Decision posted', id, eicId);
        await API.post(`/suggestion/${id}/start-discussion`, { eicId });
    } catch (error) {
        log.error(error);
    }
};
