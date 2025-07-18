const { AppError } = require('@errors');
const Reviewers = require('@models/users/reviewer/reviewers.model.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
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
const handleDeferSuggestionToReviewer = async (id, reviewerId) => {
    try {



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