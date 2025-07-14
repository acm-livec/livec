import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');


export const postStartReview = async (suggestionId, startedBy, notes, message) => {
    try {
        log.debug({ startedBy, notes, message })
        const response = await API.post(`/suggestion/${suggestionId}/start-review`, { startedBy, notes, message })
        console.log(response)
    } catch (error) {

    }
}
