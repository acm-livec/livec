import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');


export const postRecommednation = async (suggestionId, reviewerId, decision) => {
    try {
        console.log("in han:", suggestionId, reviewerId, decision)
        await API.post(`/suggestion/${suggestionId}/post-recommendation`, {reviewerId, decision})
    } catch (error) {
        logger.error(error)
    }
}