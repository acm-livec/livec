import { AppError, SuggestionNotFoundError } from '../../../shared/errors';
import Reviewers from '../../users/models/users/reviewer/reviewers.model.js';
import Suggestions from '../models/suggestions.model.js';
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.service',
    method: "addRecommendationFromReviewer",
    params: ['id', 'reviewerId']
});


/**
 * 
 * Interacts with Suggestion Model to 
 * 
 * @param {string} id 
 * @param {string} reviewerId 
 * @param {string} decision 
 */
const addRecommendationFromReviewer = async (
    id,
    reviewerId,
    decision,
    notes = ''
) => {
    try {

        logger.debug("suggestion.rec.db.searching")
        const suggestionToAddRecommendation = await Suggestions.findById(id)

        if (!suggestionToAddRecommendation) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.rec.db.found")


        logger.debug("suggestion.rec.updating_status.started")

        suggestionToAddRecommendation.addRecommendation(
            reviewerId,
            decision,
            notes
        )
        await Suggestions.update(suggestionToAddRecommendation)

        logger.debug("suggestion.rec.updating_status.completed")

        const deferredReviewer = await Reviewers.findById(reviewerId)

        deferredReviewer.assignSuggestion(id)

        await Reviewers.update(deferredReviewer)

        logger.debug("suggestion.rec.link.completed")



    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}




module.exports = addRecommendationFromReviewer