const CurriculumVersions = require('@models/curriculum/versions.model');

const addCurriculumVersion = async (curriculum, versionData) => {
    return CurriculumVersions.insert(curriculum, versionData);
};

module.exports = addCurriculumVersion;
