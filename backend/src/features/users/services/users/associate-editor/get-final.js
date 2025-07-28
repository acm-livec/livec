
import { AppError } from '../../../../../shared/errors';
import Suggestions from '../../../../suggestion/models/suggestions.model.js';
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'community-member.service',
    method: "getFinalAssociateEditorAssignedSuggestions",
    params: ['userId']
});


const getFinalAssociateEditorAssignedSuggestions = async (userId) => {

    try {

        logger.debug(`ae.suggestions.get.db.searching`, { userId })
        const suggestions = await Suggestions.getByFinalAssociateEditor(userId)

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

module.exports = getFinalAssociateEditorAssignedSuggestions