import { API } from '@api/client.js';
import { logger } from '@utils/logger'

const log = logger.create('postSuggestion.js');

export const postAssociateEditorFinalization = async (associateEditor, suggestionId, updatedSection) => {
    try {
        // console.log(associateEditor, suggestionId, updatedSection)
        await API.post(`/suggestion/${suggestionId}/finalize`, {associateEditor, updatedSection})
    } catch (error) {
        log.error(error)

    }
}
