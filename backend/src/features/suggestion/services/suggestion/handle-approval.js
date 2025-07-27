const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@shared/errors');
const Suggestions = require('@features/suggestion/models/suggestions.model.js')
const EditorsInChief = require('@features/users/models/editor-in-chief/chiefs.model')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "handleEditorInChiefApproval",
    params: ['suggestionId', 'author', 'markdownText']
});



const handleEditorInChiefApproval = async (id, eicId, notes, message) => {
    try {
        logger.debug("suggestion.approve.db.searching", { id, eicId })

        const suggestionToApprove = await Suggestions.findById(id)

        if (!suggestionToApprove) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.approve.db.found")

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