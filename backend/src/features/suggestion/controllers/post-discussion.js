const { handleFinalDiscussion } = require('../services')
const { AppError } = require('../../../shared/errors');

const logger = require('../../../../logger/logger.js').addSource({
    file: 'suggestion.controller',
    method: "postDiscussion",
    params: ['req.body']
});


const postDiscussion = async (req, res) => {

    try {
        logger.start('POST Documentation')

        const { id } = req.params
        const { eicId } = req.body

        logger.info("suggestion.add_docs.started", { suggestionId: id, author: eicId })
        const startId = await handleFinalDiscussion(id, eicId);

        logger.success("suggestion.add_docs.success", { startId });
        logger.end('POST Documentation')

        return res.status(200).json({ success: true, startId, })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.add_docs.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.add_docs.failed`, { err: error.errorCode })
        }

        logger.end('POST Documentation')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { postDiscussion }