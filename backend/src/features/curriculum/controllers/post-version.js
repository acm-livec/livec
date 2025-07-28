const { addCurriculumVersion } = require('../services');
const { AppError } = require('../../../shared/errors');
const logger = require('../../../../logger/logger.js').addSource({ file: 'curriculum.controller', method: 'postVersion' });

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

module.exports = { postVersion };
