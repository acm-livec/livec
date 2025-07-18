import { useContext, useState, useEffect } from "react"
import { logger } from '@utils/logger'
import { UserContext } from '@context/UserProvider';
import { postRejection, postStartReview, postDocumentation, postAssociateEditorFinalization, postAssignReviewers, postDeferral } from "@utils/api-handlers/suggestions";
import { getReviewers } from "@utils/api-handlers/users/get-reviewers";
import { useNavigate } from "react-router";
import { AssociateEditorActions } from "@documentation/constants/actions";


export const AssociateEditor = AssociateEditorActions

/**
 * @typedef {Object} AssociateEditorHook
 * @property {Array} reviewers
 * @property {(suggestionId: string, {forPrivate, forPublic}) => Promise<Object>} reject
 * @property {(suggestionId: string, {forPrivate, forPublic}) => Promise<void>} accept
 * @property {(suggestionId: string, formData: any) => Promise<void>} document
 * @property {(suggestionId: string, formData: any) => Promise<void>} finalize
 * @property {(suggestionId: string, formData: any) => Promise<void>} defer
 * @property {(suggestionId: string, formData: any) => Promise<void>} assign
 */


/**
 * Custom hook that models all the functionalities of an associate editor
 * 
 * - reject
 * - accept
 * @returns {AssociateEditorHook} Functionalities
 * 
 */
export default function useAssociateEditor() {
    const { user } = useContext(UserContext)
    const [reviewers, setReviewers] = useState([]);
    const navigate = useNavigate()
    const associateEditorId = user.id



    useEffect(() => {
        if (!associateEditorId) return;
        getReviewers(associateEditorId)
            .then(res => setReviewers(res))
            .catch(err => console.error(err))
    }, [associateEditorId]);




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
            const success = await postRejection(suggestionId, associateEditorId, forPrivate, forPublic)
            return success
        } catch (error) {
            logger.error(error)
            return false
        } finally {
            logger.endProcess()
        }
    }








    /**
     * Accepts the suggestion.
     *
     * @param {string} suggestionId - The ID of the suggestion to start reviewing.
     * @param {Object} params - Data from the start review form.
     * @param {string} params.forPrivate - Initial notes.
     * @param {string} params.forPublic - Message to the submitter.
     * @returns {Promise<Object>}
     */
    const accept = async (suggestionId, { forPrivate, forPublic }) => {

        try {
            logger.startProcess("Accept Suggestion")
            logger.debug(suggestionId, forPrivate, forPublic)
            const success = await postStartReview(suggestionId, associateEditorId, forPrivate, forPublic)
            return success
        } catch (error) {
            logger.error(error)
            return false
        } finally {
            logger.endProcess()
        }
    }



    /**
     * Adds documentation to the suggestion in HTML format
     * @param {string} suggestionId 
     * @param {string} documentationId 
     */
    const document = async (suggestionId, documentationId) => {
        try {
             const html = localStorage.getItem(documentationId);

             if(!html) throw Error("No docs to add")

            await postDocumentation(suggestionId, associateEditorId, html)
            localStorage.removeItem(documentationId)

            navigate(0)
        } catch (error) {
            console.error(error)
        }
    }




    /**
     * Finalizes the suggestion
     * @param {string} suggestionId 
     */
    const finalize = async (suggestionId) => {
        const updatedSection = localStorage.getItem(suggestionId);

        if (!updatedSection) throw Error("No updated section")

        try {
            await postAssociateEditorFinalization(associateEditorId, suggestionId, updatedSection)
        } catch (error) {
            console.error(error)

        }
    }





    /**
     * Defers the suggestion to a selected reviewer.
     * 
     * 
     * @param {string} suggestionId - The ID of the suggestion to defer.
     * @param {Object} params - Data from the defer to reviewer form.
     * @param {string} params.forPrivate - Notes for the reviewer.
     * @param {string} params.forPublic - Message to the submitter.
     * @param {string} params.reviewer - ID of the selected reviewer.
     * @returns {Promise<void>}
     */
    const defer = async (suggestionId, { forPrivate, forPublic, reviewer }) => {
        try {

            //await postDeferral(suggestionId, forPrivate, forPublic, reviewer)
        } catch (error) {
            console.error(error)

        }
    }


    

    /**
     * Defers the suggestion to a selected reviewer.
     * 
     * @todo Implement logic in postAssignReviewers
     * 
     *
     * @param {string} suggestionId - The ID of the suggestion to defer.
     * @param {Object} params - Data from the defer to reviewer form.
     * @param {string} params.forPrivate - Notes for the reviewer.
     * @param {string} params.forPublic - Message to the submitter.
     * @param {Array<string>} params.reviewers - Array list containing ID's of the selected reviewer/s.
     * @returns {Promise<void>}
     */
    const assign = async (suggestionId, { forPrivate, forPublic, reviewers }) => {
        try {

            //await postAssignReviewers(suggestionId, notes, message, reviewers)
        } catch (error) {
            console.error(error)

        }
    }

    return { reject, accept, defer, document, finalize, assign, reviewers }
}


