const { addCurriculumVersion } = require('@services/curriculum');
const { AppError } = require('@errors');
const logger = require('@logger').addSource({ file: 'curriculum.controller', method: 'postVersion' });

const postVersion = async (req, res) => {
    try {
        logger.start('POST Curriculum Version');
        const { curriculum } = req.params;
        const { changeSets } = req.body;
        const version = await addCurriculumVersion(curriculum, changeSets || []);
        logger.success('curriculum.version.created');
        return res.status(201).json({ success: true, version });
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        }
        return res.status(error.statusCode || 500).json({ success: false, message: error.publicMessage || 'Internal Server Error' });
    } finally {
        logger.end('POST Curriculum Version');
    }
};

module.exports = { postVersion };
