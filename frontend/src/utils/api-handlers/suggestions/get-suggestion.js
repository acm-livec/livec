import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');

export const getSuggestion = async (suggestionId, role) => {
    try {
        const response = await API.get(`/suggestion/${suggestionId}`, {
            params: { role }
        });

        const { requestedSuggestion } = response.data
        log.table(requestedSuggestion)
        return requestedSuggestion
    } catch (error) {
        log.error(error)
    }
}