import { addCurriculumVersion } from "../services/index.js";
import { AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({ file: 'curriculum.controller', method: 'postVersion' });

const postVersion = async (req, res) => {
    try {
        logger.start('POST Curriculum Version');
        const { curriculum } = req.params;
        const { section_version, contributing_member, meta, content } = req.body;
        const versionData = { section_version, contributing_member, meta, content };
        const version = await addCurriculumVersion(curriculum, versionData);
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

export { postVersion };
