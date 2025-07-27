const { getSuggestionById } = require('@features/suggestion/services')
const { AppError } = require('@shared/errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "getSuggestion",
    params: ['req.body']
});


const getSuggestion = async (req, res) => {

    try {
        logger.start('GET Suggestion')
        const { id } = req.params;
        const { role } = req.query;

        logger.info("suggestion.get.started", { requestedId: id })
        const requestedSuggestion = await getSuggestionById(id, role);

        logger.success("suggestion.get.success", { id: requestedSuggestion.id });
        logger.end('GET Suggestion')

        return res.status(200).json({ success: true, requestedSuggestion })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`suggestion.get.failed`, { err: error.message })
        } else {
            logger.info(`suggestion.get.failed`, { err: error.errorCode })
        }

        logger.end('GET Suggestion')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { getSuggestion }