import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');
export const postChangeRequest = async (id, eic, change) => {
    try {
        console.log(id, eic, change)
        await API.post(`/suggestion/${id}/change-request`, { eic, change })

    } catch (error) {
        log.error(error)
    }
}