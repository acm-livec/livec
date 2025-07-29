import getReviewerAssignedSuggestions from "../../../services/users/reviewer/get-suggestions.js";
import { AppError } from "../../../../../shared/errors/index.js";
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'reviewer',
    method: "getSuggestions",
    params: ["req.params"]
});


const getSuggestions = async (req, res) => {

    try {
        logger.start("GET Reviewer Suggestions")

        const { userId } = req.params

        logger.info(`rev.suggestions.get.started`, { revId: userId })
        const suggestions = await getReviewerAssignedSuggestions(userId)

        logger.success(`rev.suggestions.get.completed`, { numReturned: suggestions.length })
        return res.status(200).json({ success: true, suggestions })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`rev.suggestion.gets.failed`, { err: error.message })
        } else {
            logger.info(`rev.suggestions.get.failed`)
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("GET Reviewer Suggestions") }
}

export default getSuggestions;