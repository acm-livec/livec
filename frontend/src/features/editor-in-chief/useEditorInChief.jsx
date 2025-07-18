import { useContext } from 'react'
import { postEditorInChiefApproval, postChangeRequest, postRejection } from '@utils/api-handlers/suggestions'
import { UserContext } from '@context/UserProvider'
import { logger } from '@utils/logger'
import { EditorInChiefActions } from '@documentation/constants/actions'


export const EditorInChief = EditorInChiefActions

export default function useEditorInChief() {
    const { user } = useContext(UserContext);
    const editorInChiefId = user.id


    const approveSuggestion = async (suggestionId, formData) => {

        try {
            const { forPrivate, forPublic } = formData
            logger.debug("approve:", editorInChiefId, forPrivate, forPublic)
            await postEditorInChiefApproval(suggestionId, editorInChiefId, forPrivate, forPublic)
        } catch (error) {
            logger.error(error)
        }
    }

    const sendChangeRequest = async (suggestionId, formData) => {

        const { forPrivate } = formData

        try {
            await postChangeRequest(suggestionId, editorInChiefId, forPrivate)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Rejects the suggestion.
     *
     * @param {string} suggestionId - The ID of the suggestion to reject.
     * @param {Object} params - Data from the reject form.
     * @param {string} params.forPrivate - Reason for rejection.
     * @param {string} params.forPublic - Message to the submitter.
     * @returns {Promise<Object>}
     */
    const reject = async (suggestionId, { forPrivate, forPublic }) => {
        try {
            logger.startProcess("Reject Suggestion")

            logger.debug(suggestionId, forPrivate, forPublic)
            const success = await postRejection(suggestionId, editorInChiefId, forPrivate, forPublic)
            return success
        } catch (error) {
            logger.error(error)
            return false
        } finally {
            logger.endProcess()
        }
    }


    return { approveSuggestion, sendChangeRequest, reject }
}
