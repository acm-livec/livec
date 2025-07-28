const { AppError, SuggestionNotFoundError, UserNotFoundError } = require('../../../shared/errors');
const Reviewers = require('../../users/models/users/reviewer/reviewers.model.js')
const Suggestions = require('../models/suggestions.model.js')

const logger = require('../../../../logger/logger.js').addSource({
    file: 'suggestion.service',
    method: "handleDeferSuggestionToReviewer",
    params: ['id', 'reviewerId']
});


/**
 * 
 * Interacts with Suggestion Model to 
 * 
 * @param {string} id 
 * @param {string} reviewerId 
 */
const handleDeferSuggestionToReviewer = async (id, notes, message, reviewerId) => {
    try {

        logger.debug("suggestion.defer.db.searching")
        const suggestionToDefer = await Suggestions.findById(id)

        if (!suggestionToDefer) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.defer.db.found")


        logger.debug("suggestion.defer.updating_status.started")

        suggestionToDefer.defer(notes, message, reviewerId)
        await Suggestions.update(suggestionToDefer)

        logger.debug("suggestion.defer.updating_status.completed")

        const deferredReviewer = await Reviewers.findById(reviewerId)

        if (!deferredReviewer) {
            throw new UserNotFoundError
        }

        deferredReviewer.assignSuggestion(id)

        await Reviewers.update(deferredReviewer)

        logger.debug("suggestion.defer.link.completed")



    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}




module.exports = handleDeferSuggestionToReviewer