const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
// import Suggestions from '@models/suggestion/suggestions.model.js';
const EditorsInChief = require('@models/users/editor-in-chief/chiefs.model')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "sendChangeRequestToAssociateEditor",
    params: ['suggestionId', 'author', 'markdownText']
});



const sendChangeRequestToAssociateEditor = async (suggestionId, eic, change) => {
try {

        logger.debug("suggestion.change.db.searching")

        const suggestionToSendChangeRequest = await Suggestions.findById(suggestionId)

        if (!suggestionToSendChangeRequest) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.change.starting")

        suggestionToSendChangeRequest.insertChangeRequest(eic, change)

        await Suggestions.update(suggestionToSendChangeRequest)
        logger.debug("suggestion.change.finished")




    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}





module.exports = sendChangeRequestToAssociateEditor