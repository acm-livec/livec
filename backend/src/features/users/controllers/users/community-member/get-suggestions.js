import getAllCommunityMemberSuggestions from '../../../services/users/community-member/get-suggestions';
import { AppError } from '../../../../../shared/errors';
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'community-member.controller',
    method: "getSuggestions",
    params: ["req.params"]
});


const getSuggestions = async (req, res) => {

    try {
        logger.start("GET CM Suggestions")

        const { userId } = req.params

        logger.info(`cm.suggestions.get.started`, { cmId: userId })
        const suggestions = await getAllCommunityMemberSuggestions(userId)

        logger.success(`cm.suggestions.get.completed`, { numReturned: suggestions.length })
        return res.status(200).json({ success: true, suggestions })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`cm.suggestion.gets.failed`, { err: error.message })
        } else {
            logger.info(`cm.suggestions.get.failed`)
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("GET CM Suggestions") }
}

module.exports = getSuggestions