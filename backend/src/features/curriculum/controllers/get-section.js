import { getCurriculumSection } from '../services';
import { AppError } from '../../../shared/errors';
import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({ file: 'curriculum.controller', method: 'getSection' });

const getSection = async (req, res) => {
    try {
        logger.start('GET Curriculum Section');
        const { curriculum, sectionId } = req.params;
        const section = await getCurriculumSection(curriculum, sectionId);
        logger.success('curriculum.section.success');
        return res.status(200).json({ success: true, section });
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        }
        return res.status(error.statusCode || 500).json({ success: false, message: error.publicMessage || 'Internal Server Error' });
    } finally {
        logger.end('GET Curriculum Section');
    }
};

module.exports = { getSection };
