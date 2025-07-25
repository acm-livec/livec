const Curriculums = require('@models/curriculum/curriculums.model.js');

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const updateCurriculumSection = async (curriculum, section) => {
    const curr = await Curriculums.findByCurriculum(kebabToCamel(curriculum));
    if (!curr) return null;
    const updated = await curr.update(section);
    return updated;
};

module.exports = updateCurriculumSection;
