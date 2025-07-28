const Curriculums = require('../models/curriculums.model.js');
const kebabToCamel = require('../../../shared/utils/kebabToCamel');

const updateCurriculumSection = async (curriculum, section) => {
    const curr = await Curriculums.findByCurriculum(kebabToCamel(curriculum));
    if (!curr) return null;
    const updated = await curr.update(section);
    return updated;
};

module.exports = updateCurriculumSection;
