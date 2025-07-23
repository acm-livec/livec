const  getFullCurriculum  = require('@services/curriculum/get-one')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'curriculum.controller',
    method: "getCurriculum",
    params: ['req.body']
});


const getCurriculum = async (req, res) => {

    try {
        logger.start('GET Curriculum ')
        const { curriculum } = req.params;

        logger.info("curriculum.get.started", { requestedCurriculum: curriculum })
        const requestedCurriculum = await getFullCurriculum(curriculum);

        logger.success("curriculum.get.success");
        logger.end('GET Suggestion')

        return res.status(200).json({ success: true, requestedCurriculum })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`curriculum.get.failed`, { err: error.message })
        } else {
            logger.info(`curriculum.get.failed`, { err: error.errorCode })
        }

        logger.end('GET Curriculum')

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    }
}

module.exports = { getCurriculum }