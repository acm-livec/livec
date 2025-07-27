const { associateEditorFinalized } = require('@features/suggestion/services')
const { AppError } = require('@shared/errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postSuggestion",
    params: ['req.body']
});


const postAssociateEditorFinalization = async (req, res) => {

    try {
        logger.start('POST Suggestion Finalized')

        const { id } = req.params
        const { associateEditor, updatedSection } = req.body

        logger.info("suggestion.finalize.started", { suggestionId: id, associateEditor: associateEditor })
        const rejectId = await associateEditorFinalized(id, associateEditor, updatedSection);

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

module.exports = { postAssociateEditorFinalization }