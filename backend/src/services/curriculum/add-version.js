const CurriculumVersions = require('@models/curriculum/versions.model');

const addCurriculumVersion = async (curriculum, changeSets) => {
    const versions = await CurriculumVersions.getAll(curriculum);
    const version = {
        version: versions.length + 1,
        changeSets
    };
    return CurriculumVersions.insert(curriculum, version);
};

module.exports = addCurriculumVersion;
