import CurriculumVersions from "../models/versions.model.js";

const addCurriculumVersion = async (curriculum, versionData) => {
    return CurriculumVersions.insert(curriculum, versionData);
};

export default addCurriculumVersion;
