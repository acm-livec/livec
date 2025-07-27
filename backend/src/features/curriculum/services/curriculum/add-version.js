const CurriculumVersions = require('@features/curriculum/models/versions.model');

const addCurriculumVersion = async (curriculum, versionData) => {
    return CurriculumVersions.insert(curriculum, versionData);
};

module.exports = addCurriculumVersion;
