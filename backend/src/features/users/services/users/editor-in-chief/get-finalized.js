import { AppError } from "../../../../../shared/errors/index.js";
import Suggestions from '../../../../suggestion/models/suggestions.model.js';
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'community-member.service',
    method: "getAllCommunityMemberSuggestions",
    params: ['userId']
});


const getFinalizedSuggestions = async (userId) => {
    
    try {

        logger.debug(`eic.suggestions.get.db.searching`)
        const suggestions = await Suggestions.getFinalized(userId)

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

export default getFinalizedSuggestions;