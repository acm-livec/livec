import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

/**
 * Fetches a suggestion by its ID and role from the API.
 *
 * @async
 * @function getSuggestion
 * @param {string} suggestionId - The ID of the suggestion to retrieve.
 * @param {string} role - The role context for fetching the suggestion.
 * @returns {Promise<Object>} A promise that resolves to the retrieved suggestion object.
 * @route GET: /suggestion/:id
 * @file backend/src/routes/suggestion.routes.js
 */
export const getSuggestion = async (suggestionId, role) => {
    try {
        const response = await API.get(`/suggestion/${suggestionId}`, {
            params: { role },
        });

        const { requestedSuggestion } = response.data;
        log.table(requestedSuggestion);
        return requestedSuggestion;
    } catch (error) {
        log.error(error);
    }
};
