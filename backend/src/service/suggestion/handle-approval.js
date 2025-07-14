const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
const EditorsInChief = require('@models/users/editor-in-chief/chiefs.model')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "handleEditorInChiefApproval",
    params: ['suggestionId', 'author', 'markdownText']
});



const handleEditorInChiefApproval = async (id, eicId, notes, message) => {
try {

        logger.debug("suggestion.approve.db.searching")

        const suggestionToApprove = await Suggestions.findById(id)

        if (!suggestionToApprove) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.approve.starting")

        suggestionToApprove.approve(eicId, notes, message)

        await Suggestions.update(suggestionToApprove)
        logger.debug("suggestion.approve.finished")

        return "###-####"

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}




module.exports = handleEditorInChiefApproval