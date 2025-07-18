const { AppError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "handleStartSuggestionReviewProcess",
    params: ['suggestionId', 'startedBy', 'notes', 'message']
});

const handleStartSuggestionReviewProcess = async (suggestionId, startedBy, notes, message) => {
try {

        logger.debug("suggestion.start_review.db.searching")

        const suggestionToStartReview = await Suggestions.findById(suggestionId)

        if (!suggestionToStartReview) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.start_review.starting")
        const startId = suggestionToStartReview.startReview(startedBy, notes, message)
        Suggestions.update(suggestionToStartReview)
        logger.debug("suggestion.start_review.started")

        return startId

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}


module.exports = handleStartSuggestionReviewProcess