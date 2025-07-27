const CurriculumVersions = require('@features/curriculum/models/versions.model');

const getCurriculumVersion = async (curriculum, versionId) => {
    return CurriculumVersions.getById(curriculum, versionId);
};

module.exports = getCurriculumVersion;
