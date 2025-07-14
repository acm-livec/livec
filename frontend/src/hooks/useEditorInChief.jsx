import {useContext} from 'react'
import { postEditorInChiefApproval, postChangeRequest } from '@utils/api-handlers/suggestions'
import { UserContext } from '@context/UserProvider'

export default function useEditorInChief() {
    const {user} = useContext(UserContext);
    const editorInChiefId = user.id


    const approveSuggestion = async (suggestionId, formData) => {
   
        try {
            const { forPrivate, forPublic } = formData
            console.log("approve:", editorInChiefId, forPrivate, forPublic)
            await postEditorInChiefApproval(suggestionId, editorInChiefId, forPrivate, forPublic)
        } catch (error) {
            console.error(error)

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

    return {approveSuggestion, sendChangeRequest}
}
