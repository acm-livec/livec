const { AppError, SuggestionNotFoundError } = require('@errors');
const Reviewers = require('@models/users/reviewer/reviewers.model.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignReviewersToSuggestion",
    params: ['suggestionId, notes, message, reviewers']
});


const assignReviewersToSuggestion = async (suggestionId, reviewers) => {

    try {

        logger.debug("suggestion.assign_reviewers.db.searching", { suggestionId, reviewers })
        const suggestionToAddReviewers = await Suggestions.findById(suggestionId);

        if (!suggestionToAddReviewers) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.assign_reviewers.db.found")


        logger.debug("suggestion.assign_reviewers.db.inserting")

        suggestionToAddReviewers.assignReviewers(reviewers)
        await Suggestions.update(suggestionToAddReviewers)

        logger.debug("suggestion.assign_reviewers.db.inserted")

        await linkSuggestionToReviewers(suggestionId, reviewers)


    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error

    }
}



const linkSuggestionToReviewers = async (suggestionId, reviewers) => {

    try {
        logger.info("suggestion.link_reviewers.started")

        for (const id of reviewers) {
            const rev = await Reviewers.findById(id);
            rev.assignSuggestion(suggestionId);
            await Reviewers.update(rev);
        }

        logger.success("suggestion.link_reviewers.completed")

    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }

}



module.exports = assignReviewersToSuggestion