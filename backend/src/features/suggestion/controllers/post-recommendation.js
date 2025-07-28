const { addRecommendationFromReviewer } = require('@features/suggestion/services')
const { AppError } = require('@shared/errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postRecommednation",
    params: ['req.body']
});


const postRecommednation = async (req, res) => {

    try {
        logger.start('POST Rec')

        const { id } = req.params
        const { reviewerId, decision, notes } = req.body

        logger.info("suggestion.rec.started", { suggestionId: id, reviewerId: reviewerId })
        const startId = await addRecommendationFromReviewer(
            id,
            reviewerId,
            decision,
            notes
        );

        logger.success("suggestion.rec.success", { startId });
        logger.end('POST Documentation')

        return res.status(200).json({ success: true, startId, })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.rec.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.rec.failed`, { err: error.errorCode })
        }

        logger.end('POST Rec')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { postRecommednation }