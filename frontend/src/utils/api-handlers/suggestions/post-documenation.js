import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');


export const postDocumentation = async (suggestionId, author, markdownText) => {
    try {
        await API.post(`/suggestion/${suggestionId}/add-docs`, {author, markdownText})
    } catch (error) {
        logger.error(error)
    }
}
