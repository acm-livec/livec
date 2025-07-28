const { assignReviewersToSuggestion } =require('../services')
const { AppError } = require('../../../shared/errors');

const logger = require('../../../../logger/logger.js').addSource({
    file: 'suggestion.controller',
    method: "postReviewers",
    params: ['req.body']
});


const postAssignReviewers = async (req, res) => {

    try {
        logger.start('POST Suggestion Reviewers')

        const { id } = req.params
        const {  reviewers } = req.body

        logger.info("suggestion.post.reviewers.started", { suggestionId: id, numAssigned: reviewers.length })
        await assignReviewersToSuggestion(id,  reviewers );

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

module.exports = { postAssignReviewers }