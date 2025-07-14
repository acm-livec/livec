const getFinalizedSuggestions = require('@service/users/editor-in-chief/get-finalized')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'reviewer',
    method: "getSuggestions",
    params: ["req.params"]
});


const getSuggestions = async (req, res) => {

    try { logger.start("GET EIC Suggestions")

        const { userId } = req.params

        logger.info(`eic.suggestions.get.started`, { eicId: userId })
        const suggestions = await getFinalizedSuggestions(userId)

        logger.success(`eic.suggestions.get.completed`, { numReturned: suggestions.length })
        return res.status(200).json({ success: true, suggestions })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`eic.suggestion.gets.failed`, { err: error.message })
        } else {
            logger.info(`eic.suggestions.get.failed`)
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("GET EIC Suggestions") }
}

module.exports = getSuggestions