import { AppError, SuggestionNotFoundError } from "../../../shared/errors/index.js";
import Suggestions from '../models/suggestions.model.js';



import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({
    file: 'auth.service',
    method: "handleRejectSuggestion",
    params: ['suggestionId', 'rejectedById']
});


const handleRejectSuggestion = async (suggestionId, rejectedById, reason, message) => {

    try {

        logger.debug("suggestion.reject.db.searching", { suggestionId })
        const suggestionToReject = await Suggestions.findById(suggestionId)
        
        if (!suggestionToReject) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.reject.db.found")

        
        logger.debug("suggestion.reject.updating_status.started")

        suggestionToReject.reject(rejectedById, reason, message)
        await Suggestions.update(suggestionToReject)

        logger.debug("suggestion.reject.updating_status.completed")



    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

export default handleRejectSuggestion;