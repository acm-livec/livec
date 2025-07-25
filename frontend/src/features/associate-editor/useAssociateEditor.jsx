import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react"

import { logger } from '@utils/logger'
import { UserContext } from '@context/UserProvider';
import { getReviewers } from "@utils/api-handlers/users/get-reviewers";
import { AssociateEditorActions } from "@documentation/constants/actions";
import {
    postRejection,
    postStartReview,
    postDocumentation,
    postAssociateEditorFinalization,
    postAssignReviewers,
    postDeferral
} from "@utils/api-handlers/suggestions";




export const AssociateEditor = AssociateEditorActions



/**
 * @typedef {Object} AssociateEditorHook
 * @property {Array} reviewers
 * @property {(suggestionId: string, {forPrivate, forPublic}) => Promise<Object>} reject
 * @property {(suggestionId: string, {forPrivate, forPublic}) => Promise<void>} accept
 * @property {(suggestionId: string, formData: any) => Promise<void>} defer
 * @property {(suggestionId: string, formData: any) => Promise<void>} document
 * @property {(suggestionId: string, formData: any) => Promise<void>} finalize
 * @property {(suggestionId: string, formData: any) => Promise<void>} assign
 */


/**
 * Custom hook that models all the functionalities of an Associate Editor.
 * 
 * - reject - Desk rejects a suggestion.
 * - accept - Accepts a suggestion to start reviewing.
 * - defer - Defers a suggestion to a selected reviewer.
 * - assign - Assigns selected reviewer/s to review a suggestion.
 * - document - Assigns selected reviewer/s to review a suggestion.
 * 
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
            .catch(err => logger.error(err))
    }, [associateEditorId]);




    /**
     * Rejects a suggestion with provided private and public messages.
     *
     * @param {string} suggestionId - The ID of the suggestion to reject.
     * @param {Object} params - Data from the rejection form.
     * @param {string} params.forPrivate - Private notes for rejection.
     * @param {string} params.forPublic - Message to the submitter.
     * 
     * @returns {Promise<boolean>} A promise resolving to a boolean indicating success.
     */
    const reject = async (suggestionId, { forPrivate, forPublic }) => {
        try {
            logger.startProcess('Reject Suggestion')
            logger.debug({ suggestionId, forPrivate, forPublic })
            const strucPriv = [{
                type: 'p',
                children: [{ text: forPrivate }]
            }]
            logger.debug({ suggestionId, forPrivate, forPublic })
            const strucPub = [{
                type: 'p',
                children: [{ text: forPublic }]
            }]
            const success = await postRejection(suggestionId, associateEditorId, strucPriv, strucPub)
            logger.success('Suggestion rejected:', { suggestionId, success })
            return success
        } catch (error) {
            logger.error(error)
            return false
        } finally {
            logger.endProcess()
        }
    }








    /**
     * Starts the review process for a suggestion.
     *
     * @async
     * @function accept
     * @param {string} suggestionId - The ID of the suggestion to accept for review.
     * @param {Object} params - Data from the review form.
     * @param {string} params.forPrivate - Private notes for the reviewer.
     * @param {string} params.forPublic - Public message to the submitter.
     * @returns {Promise<Object>} A promise resolving to a boolean indicating success.
     */
    const accept = async (suggestionId, { forPrivate, forPublic }) => {
        try {
            logger.startProcess('Accept Suggestion')
            logger.debug({ suggestionId, forPrivate, forPublic })
             const strucPriv = [{
                type: 'p',
                children: [{ text: forPrivate }]
            }]
            logger.debug({ suggestionId, forPrivate, forPublic })
            const strucPub = [{
                type: 'p',
                children: [{ text: forPublic }]
            }]
            const success = await postStartReview(suggestionId, associateEditorId, strucPriv, strucPub)
            logger.success('Review started for suggestion:', { suggestionId, success })
            return success
        } catch (error) {
            logger.error(error)
            return false
        } finally {
            logger.endProcess()
        }
    }



    /**
     * Adds documentation to a suggestion.
     *
     * @async
     * @function document
     * @param {string} suggestionId - The ID of the suggestion to document.
     * @param {string} documentationId - The localStorage key for documentation.
     * @returns {Promise<void>} A promise resolving when documentation is added.
     */
    const document = async (suggestionId, documentationId) => {
        try {
            logger.startProcess('Add Documentation')
            const docs = JSON.parse(localStorage.getItem(documentationId))
            if (!docs) throw new Error('No documentation available')
            logger.debug({ suggestionId, documentationId, htmlLength: docs.length })
            await postDocumentation(suggestionId, associateEditorId, docs)
            logger.success('Documentation added for suggestion:', { suggestionId })
            localStorage.removeItem(documentationId)
            navigate(0)
        } catch (error) {
            logger.error(error)
        } finally {
            logger.endProcess()
        }
    }




    /**
     * Finalizes a suggestion review by the associate editor.
     *
     * @async

     * @param {string} suggestionId - The ID of the suggestion to finalize.
     * @returns {Promise<void>} A promise resolving when the suggestion is finalized.
     */
    const finalize = async (suggestionId) => {
        const updatedSection = JSON.parse(localStorage.getItem(suggestionId))
        if (!updatedSection) throw new Error('No updated section available')
        try {
            logger.startProcess('Finalize Suggestion')
            logger.debug({ suggestionId, updatedSection })
            await postAssociateEditorFinalization(associateEditorId, suggestionId, updatedSection)
            logger.success('Suggestion finalized:', { suggestionId })
        } catch (error) {
            logger.error(error)
        } finally {
            logger.endProcess()
        }
    }





    /**
     * Defers a suggestion to a reviewer for further review.
     *
     * @param {string} suggestionId - The ID of the suggestion to defer.
     * @param {Object} params - Data from the defer form.
     * @param {string} params.forPrivate - Private notes for the reviewer.
     * @param {string} params.forPublic - Public message to the submitter.
     * @param {string} params.reviewer - The ID of the reviewer.
     * @returns {Promise<void>} A promise resolving when the suggestion is deferred.
     */
    const defer = async (suggestionId, { forPrivate, forPublic, reviewer }) => {
        try {
            logger.startProcess('Defer Suggestion')
            logger.debug({ suggestionId, forPrivate, forPublic, reviewer })
            const strucPriv = [{
                type: 'p',
                children: [{ text: forPrivate }]
            }]
            logger.debug({ suggestionId, forPrivate, forPublic })
            const strucPub = [{
                type: 'p',
                children: [{ text: forPublic }]
            }]
            await postDeferral(suggestionId, strucPriv, strucPub, reviewer)
            logger.success('Suggestion deferred to reviewer:', { suggestionId, reviewer })
        } catch (error) {
            logger.error(error)
        } finally {
            logger.endProcess()
        }
    }




    /**
     * Assigns one or more reviewers to a suggestion.
     *
     * @param {string} suggestionId - The ID of the suggestion to assign reviewers to.
     * @param {Object} params - Data from the assignment form.
     * @param {string} params.forPrivate - Private notes for reviewers.
     * @param {string} params.forPublic - Public message to the submitter.
     * @param {Array<string>} params.reviewers - Array of reviewer IDs.
     * @returns {Promise<void>} A promise resolving when reviewers are assigned.
     */
    const assign = async (suggestionId, { reviewers }) => {
        try {
            logger.startProcess('Assign Reviewers')
            logger.debug({ suggestionId, reviewers })
            await postAssignReviewers(suggestionId, reviewers)
            logger.success('Reviewers assigned:', { suggestionId, reviewers })
        } catch (error) {
            logger.error(error)
        } finally {
            logger.endProcess()
        }
    }

    return { reject, accept, defer, document, finalize, assign, reviewers }
}


