
const { handleEditorInChiefApproval } = require('@services/suggestion')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postEditorInChiefApproval",
    params: ['req.body']
});


const postEditorInChiefApproval = async (req, res) => {

    try {
        logger.start('POST Suggestion Finalized')

        const { id } = req.params
        const { eicId, notes, message } = req.body

        logger.info("suggestion.finalize.started", { suggestionId: id, eicId: eicId })
        const rejectId = await handleEditorInChiefApproval(id, eicId, notes, message);

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

module.exports = { postEditorInChiefApproval }
