import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');


	/**
	 * Adds documentation to a suggestion.
	 *
	 * @async
	 * @function postDocumentation
	 * @param {string} suggestionId - The ID of the suggestion to document.
	 * @param {string} author - The ID of the author adding documentation.
	 * @param {string} markdownText - The documentation content in markdown format.
	 * @returns {Promise<void>} A promise that resolves when documentation is added.
	 * @route POST: /suggestion/:id/add-docs
	 * @file backend/src/routes/suggestion.routes.js
	 */
	export const postDocumentation = async (suggestionId, author, markdownText) => {
    try {
        await API.post(`/suggestion/${suggestionId}/add-docs`, {author, markdownText})
    } catch (error) {
        logger.error(error)
    }
}
