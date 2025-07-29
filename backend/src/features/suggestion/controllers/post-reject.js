import { handleRejectSuggestion } from "../services/index.js";
import { AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.controller',
    method: "postSuggestion",
    params: ['req.body']
});


const postRejection = async (req, res) => {

    try {  logger.start('POST Suggestion Rejected')
        
        const { id } = req.params
        const { rejectedBy, reasonForRejection, messageToSubmitter } = req.body

        logger.info("suggestion.reject.process.started", { suggestionId: id, rejectedBy: rejectedBy })
        await handleRejectSuggestion(id, rejectedBy, reasonForRejection, messageToSubmitter);

        logger.success("suggestion.reject.process.completed");
        return res.status(200).json({ success: true, message: `Suggestion succesfully rejected` })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.reject.process.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.reject.process.failed`, { err: error.errorCode })
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end('POST Suggestion Rejected') }
}

export { postRejection };