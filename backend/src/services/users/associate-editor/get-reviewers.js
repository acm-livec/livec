const { AppError } = require('@errors');
const Reviewers = require('@models/users/reviewer/reviewers.model.js')
const logger = require('@logger').addSource({
    file: 'associate-editor.service',
    method: "getAssignedReviewers",
    params: ['userId']
});


const getAssignedReviewers = async (userId) => {
    
    try {

        logger.debug(`ae.reviewers.get.db.searching`)
        const reviewers = await Reviewers.getByAssociateEditor(userId)

        return reviewers

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = getAssignedReviewers