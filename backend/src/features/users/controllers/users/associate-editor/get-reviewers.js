import getAssignedReviewers from "../../../services/users/associate-editor/get-reviewers.js";
import { AppError } from "../../../../../shared/errors/index.js";
import baseLogger from '../../../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'associate-editor.controller.js',
    method: 'getReviewers',
    params: ['userId']
});


async function getReviewers(req, res) {

    try {
        logger.start("GET AE Assigned Reviewers")
        const { userId } = req.params;

        logger.info(`ae.reviewers.get.started`, { aeId: userId })
        const reviewers = await getAssignedReviewers(userId);

        logger.success(`ae.reviewers.get.completed`, { numReturned: reviewers.length })


        logger.end("GET AE Assigned Reviewers")
        return res.status(200).json({ success: true, reviewers });

    } catch (error) {


        if (!(error instanceof AppError)) {
            logger.error(`ae.reviewers.gets.failed`, { err: error.message })
        } else {
            logger.info(`ae.reviewers.get.failed`)
        }

        logger.end("GET AE Assigned Reviewers")

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });
    }
}
export default getReviewers;