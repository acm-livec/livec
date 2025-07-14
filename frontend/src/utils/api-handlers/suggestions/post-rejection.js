import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');

export const postRejection = async (suggestionId, rejectedBy, reason, message) => {
    try {
        log.debug({ suggestionId, rejectedBy, reason, message })
        const response = await API.post(`/suggestion/${suggestionId}/reject`, {rejectedBy, reason, message})
        logger.debug('response')
        return response
    } catch (error) {
        logger.error(error)
    }
}