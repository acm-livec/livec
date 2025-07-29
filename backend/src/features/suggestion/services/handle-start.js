import { AppError } from "../../../shared/errors/index.js";
import Suggestions from '../models/suggestions.model.js';
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.service',
    method: "handleStartSuggestionReviewProcess",
    params: ['suggestionId', 'startedBy', 'notes', 'message']
});

const handleStartSuggestionReviewProcess = async (suggestionId, startedBy, notes, message) => {
try {

        logger.debug("suggestion.start_review.db.searching", { suggestionId })

        const suggestionToStartReview = await Suggestions.findById(suggestionId)

        if (!suggestionToStartReview) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.start_review.db.found")

        logger.debug("suggestion.start_review.starting")
        const startId = suggestionToStartReview.startReview(startedBy, notes, message)
        await Suggestions.update(suggestionToStartReview)
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


export default handleStartSuggestionReviewProcess;