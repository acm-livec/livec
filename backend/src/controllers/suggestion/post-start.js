const { handleStartSuggestionReviewProcess } = require('@service/suggestion')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postStartReview",
    params: ['req.body']
});


const postStartReview = async (req, res) => {

    try {
        logger.start('POST Suggestion Start Review')

        const { id } = req.params
        const { startedBy, notes, message } = req.body

        logger.info("suggestion.start_review.started", { suggestionId: id, startedBy: startedBy })
        const startId = await handleStartSuggestionReviewProcess(id, startedBy, notes, message);

        logger.success("suggestion.start_review.success", { startId });
        logger.end('POST Suggestion Start Review')

        return res.status(200).json({ success: true, startId, })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.reject.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.reject.failed`, { err: error.errorCode })
        }

        logger.end('POST Suggestion Start Review')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { postStartReview }