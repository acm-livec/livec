import { API } from '@api/client.js';
import { logger } from '@utils/logger'



export const postStartReview = async (suggestionId, startedBy, notes, messageToSubmitter) => {
    try {
        const response = await API.post(`/suggestion/${suggestionId}/start-review`, { startedBy, notes, messageToSubmitter })
        const { success, message } = response.data
        logger.success(message)
        return success
    } catch (error) {
        logger.error(error)
    }
}
