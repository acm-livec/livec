const { assignReviewersToSuggestion } = require('@service/suggestion')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'suggestion.controller',
    method: "postReviewers",
    params: ['req.body']
});


const postReviewers = async (req, res) => {

    try {
        logger.start('POST Suggestion Reviewers')

        const { id } = req.params
        const { notes, message, reviewers } = req.body

        logger.info("suggestion.post.reviewers.started", { suggestionId: id, numAssigned: reviewers.length })
         await assignReviewersToSuggestion(id, notes, message, reviewers );

        logger.success("suggestion.post.reviewers.completed");
        logger.end('POST Suggestion Reviewers')

        return res.status(200).json({ success: true })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`"suggestion.post.reviewers.failed`, { err: error.message })
        } else {
            logger.info(`"suggestion.post.reviewers.failed`, { err: error.errorCode })
        }

        logger.end('POST Suggestion Reviewers')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { postReviewers }