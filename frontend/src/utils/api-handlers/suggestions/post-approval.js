import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');
export const postEditorInChiefApproval = async (id, eicId, notes, message) => {
    try {
        console.log(id, eicId, notes, message)
        await API.post(`/suggestion/${id}/approve`, { eicId, notes, message })

    } catch (error) {
        log.error(error)
    }
}

