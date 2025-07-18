import { API } from '@api/client.js';
import { logger } from '@utils/logger'


export const postRejection = async (suggestionId, rejectedBy, reasonForRejection, messageToSubmitter) => {

    try {
        const response = await API.post(`/suggestion/${suggestionId}/reject`, { 
            rejectedBy, reasonForRejection, messageToSubmitter 
        })

        const { success, message } = response.data
        logger.success(message)
        return success
        
    } catch (error) {
        logger.error(error)
    }
}