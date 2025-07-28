const CurriculumVersions = require('../models/versions.model');
const { AppError } = require('../../../shared/errors');
const kebabToCamel = require('../../../shared/utils/kebabToCamel')


const logger = require('../../../../logger/logger.js').addSource({
    file: 'auth.service',
    method: "getCurriculumVersion",
    params: ['curriculum', 'versionId']
});

const getCurriculumVersion = async (curriculum, versionId) => {
    try {
        logger.debug("curriculum.get-version.db.searching", { curriculum, versionId })
        return CurriculumVersions.getById(kebabToCamel(curriculum), versionId);
        // logger.debug("curriculum.get-version.db.found")
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
};

module.exports = getCurriculumVersion;
