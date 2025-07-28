import CurriculumVersions from '../models/versions.model';
import {  AppError  } from '../../../shared/errors';
import kebabToCamel from '../../../shared/utils/kebabToCamel.js';


import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({
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
