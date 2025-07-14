import { useState, useContext } from "react"
import { UserContext } from '@context/UserProvider';
import { postRejection, postStartReview, postDocumentation, postAssociateEditorFinalization } from "@utils/api-handlers/suggestions";
import { logger } from '@utils/logger'


/**
 * @typedef {Object} AssociateEditorHook
 * @property {(suggestionId: string, formData: any) => Promise<void>} reject
 * @property {(suggestionId: string, formData: any) => Promise<void>} accept
 * @property {(suggestionId: string, formData: any) => Promise<void>} document
 * @property {(suggestionId: string, formData: any) => Promise<void>} finalize
 * @property {(suggestionId: string, formData: any) => Promise<void>} defer
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



    /**
     * Rejects the suggestion
     * @param {string} suggestionId 
     * @param {{forPrivate: string, forPublic: string}} formData 
     */
    const reject = async (suggestionId, formData) => {
        try {
            logger.startProcess("Reject Suggestion")
            const { forPrivate, forPublic } = formData
            await postRejection(suggestionId, user.id, forPrivate, forPublic)
        } catch (error) {
            logger.error(error)
        } finally {
            logger.endProcess()
        }
    }








    /**
     * Starts the review process for the suggestion
     * @param {string} suggestionId 
     * @param {{forPrivate: string, forPublic: string}} formData 
     */
    const accept = async (suggestionId, formData) => {
        try {
            console.log("call to start:", suggestionId, formData)
            const { forPrivate, forPublic } = formData
            console.log("des:", forPrivate, forPublic)

            await postStartReview(suggestionId, user.id, forPrivate, forPublic)
        } catch (error) {
            console.error(error)

        }
    }


    
    /**
     * Adds documentation to the suggestion in HTML format
     * @param {string} suggestionId 
     * @param {string} documentationHtml 
     */
    const document = async (suggestionId, documentationHtml) => {
        try {
            const author = user.id
            console.log(suggestionId, author, documentationHtml)
            await postDocumentation(suggestionId, author, documentationHtml)
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

        const ae = user.id
        try {
            await postAssociateEditorFinalization(ae, suggestionId, updatedSection)
        } catch (error) {
            console.error(error)

        }
    }



    /**
     * Defers the suggestion to the selected reviewer
     * @param {string} suggestionId 
     * @param {{forPrivate: string, forPublic: string, reviewer: string}} formData 
     */
    const defer = async (suggestionId, formData) => {
        try {
            console.log("call to start:", suggestionId, formData)
            const { forPrivate, forPublic, reviewer } = formData
            console.log("des:", forPrivate, forPublic, reviewer)

            //await postReviewers(suggestionId, notes, message, reviewers)
        } catch (error) {
            console.error(error)

        }
    }

    return {
        reject, accept,
        defer, document,
        finalize,
    }
}
