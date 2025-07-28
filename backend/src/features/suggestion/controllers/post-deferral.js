import { handleDeferSuggestionToReviewer } from '../services';
import { AppError } from '../../../shared/errors';
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.controller',
    method: "postDeferral",
    params: ['req.body']
});


const postDeferral = async (req, res) => {

    try {

        const { id } = req.params
        const {notes, message, reviewerId } = req.body

        logger.info("suggestion.defer.started", { suggestionId: id, reviewerId: reviewerId })
        await handleDeferSuggestionToReviewer(id, notes, message, reviewerId);

        logger.success("suggestion.defer.success");
        logger.end('POST Defer Finalized')

        return res.status(200).json({ success: true, message: `Suggestion succesfully defered` })



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