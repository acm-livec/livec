const { assignReviewersToSuggestion } = require('@services/suggestion')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postDeferral",
    params: ['req.body']
});


const postDeferral = async (req, res) => {

    try {

        




    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`"suggestion.defer.failed`, { err: error.message })
        } else {
            logger.info(`"suggestion.defer.failed`, { err: error.errorCode })
        }

        logger.end('POST Deferral')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { postDeferral }