import getAssociateEditorAssignedSuggestions from "../../../services/users/associate-editor/get-suggestions.js";
import { AppError } from "../../../../../shared/errors/index.js";
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'community-member.controller',
    method: "getSuggestions",
    params: ["req.params"]
});


const getSuggestions = async (req, res) => {

    try {
        logger.start("GET AE Assigned Suggestions")

        const { userId } = req.params

        logger.info(`ae.suggestions.get.started`, { aeId: userId })
        const suggestions = await getAssociateEditorAssignedSuggestions(userId)

        logger.success(`ae.suggestions.get.completed`, { numReturned: suggestions.length })
        return res.status(200).json({ success: true, suggestions })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`ae.suggestion.gets.failed`, { err: error.message })
        } else {
            logger.info(`ae.suggestions.get.failed`)
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("GET AE Assigned Suggestions") }
}

export default getSuggestions;