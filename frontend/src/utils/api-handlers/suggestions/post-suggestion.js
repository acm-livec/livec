import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

/**
 * Creates a new suggestion.
 *
 * @async
 * @function postSuggestion
 * @param {string} userId - The ID of the user submitting the suggestion.
 * @param {string} title - The title of the suggestion.
 * @param {string} suggestion - The content of the suggestion.
 * @param {string} discipline - The discipline/category of the suggestion.
 * @param {string} sectionId - The ID of the section to which the suggestion belongs.
 * @returns {Promise<Object>} A promise that resolves to the created suggestion data.
 * @route POST: /suggestion
 * @file backend/src/routes/suggestion.routes.js
 */
export const postSuggestion = async (
    userId,
    title,
    suggestion,
    discipline,
    sectionId
) => {
    try {
        log.debug('Submitting suggestion', {
            userId,
            title,
            suggestion,
            discipline,
            sectionId,
        });

        const { data } = await API.post('/suggestion', {
            userId,
            title,
            suggestion,
            discipline,
            sectionId,
        });

        log.success('✅ Suggestion created with ID:', data.suggestionId);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || 'Unknown error';
        log.error('❌ Failed to post suggestion:', error.response);
        throw Error(error.response?.data);
    }
};
