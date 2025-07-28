const Suggestions = require('../../../../suggestion/models/suggestions.model.js')

const logger = require('../../../../../../logger/logger.js').addSource({
    file: 'reviewer.service',
    method: "getReviewerAssignedSuggestions",
    params: ['userId']
});


const getReviewerAssignedSuggestions = async (userId) => {
    
    try {

        logger.debug(`rev.suggestions.get.db.searching`)
        const suggestions = await Suggestions.getByReviewer(userId)

        return suggestions

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = getReviewerAssignedSuggestions