
import { sendChangeRequestToAssociateEditor } from "../services/index.js";
import { AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.controller',
    method: "postChangeRequest",
    params: ['req.body']
});


const postChangeRequest = async (req, res) => {

    try {
        logger.start('POST Suggestion Finalized')

        const { id } = req.params
        const { eic, change } = req.body

        logger.info("suggestion.finalize.started", { suggestionId: id, eicId: eic })
        const rejectId = await sendChangeRequestToAssociateEditor(id, eic, change);

        logger.success("suggestion.finalize.success", { rejectId });
        logger.end('POST Suggestion Finalized')

        return res.status(200).json({ success: true, rejectId, message: `Suggestion succesfully rejected with ID: ${rejectId}` })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.finalize.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.finalize.failed`, { err: error.errorCode })
        }

        logger.end('POST Suggestion Finalized')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

export { postChangeRequest };
