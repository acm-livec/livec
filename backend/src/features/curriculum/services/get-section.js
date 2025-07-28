const Curriculums = require('../models/curriculums.model.js');
const kebabToCamel = require('../../../shared/utils/kebabToCamel');

const getCurriculumSection = async (curriculum, id) => {
    const curr = await Curriculums.findByCurriculum(kebabToCamel(curriculum));
    if (!curr) return null;
    const section = await curr.getSection(id);
    return section;
};

module.exports = getCurriculumSection;
