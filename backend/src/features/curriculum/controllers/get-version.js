import { getCurriculumVersion } from '../services';
import { AppError } from '../../../shared/errors';
import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({ file: 'curriculum.controller', method: 'getVersion' });

const getVersion = async (req, res) => {
    try {
        logger.start('GET Curriculum Version');
        const { curriculum, versionId } = req.params;
        const version = await getCurriculumVersion(curriculum, versionId);
        if (!version) {
            const error = new AppError('Version not found', 404, 'VERSION_NOT_FOUND');
            throw error;
        }
        logger.success('curriculum.version.found');
        return res.status(200).json({ success: true, version });
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        } else {
            logger.info(error.message, { err: error.errorCode });
        }
        return res.status(error.statusCode || 500).json({ success: false, message: error.publicMessage || 'Internal Server Error' });
    } finally {
        logger.end('GET Curriculum Version');
    }
};

module.exports = { getVersion };
