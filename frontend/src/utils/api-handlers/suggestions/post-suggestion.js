import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');

export const postSuggestion = async (userId, title, suggestion, discipline, sectionId) => {
    try {

        console.log({
            userId,
            title,
            suggestion,
            discipline,
            sectionId
        });


        const { data } = await API.post('/suggestion', {
            userId,
            title,
            suggestion,
            discipline,
            sectionId
        });

        log.success('✅ Suggestion created with ID:', data.suggestionId);
        return data

    } catch (error) {
        const message = error.response?.data?.message || 'Unknown error';
        log.error('❌ Failed to post suggestion:', error.response);
        throw Error(error.response?.data);
    }
};