const Curriculums = require('@models/curriculum/curriculums.model.js');

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const getCurriculumSection = async (curriculum, id) => {
    const curr = await Curriculums.findByCurriculum(kebabToCamel(curriculum));
    if (!curr) return null;
    const section = await curr.getSection(id);
    return section;
};

module.exports = getCurriculumSection;
