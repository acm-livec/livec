import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postSuggestion.js');

/**
 * Fetches a suggestion by its ID and role from the API.
 *
 * @async
 * @function getSuggestion
 * @param {string} curriculum - The ID of the suggestion to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved suggestion object.
 * @route GET: /suggestion/:id
 * @file backend/src/routes/suggestion.routes.js
 */
export const getCurriculum = async (curriculum) => {
    try {
        const response = await API.get(`/curriculums/${curriculum}`, {});

        const { requestedCurriculum } = response.data;
        log.table(requestedCurriculum);
        return requestedCurriculum;
    } catch (error) {
        log.error(error);
    }
};
