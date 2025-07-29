import Curriculums from '../models/curriculums.model.js';
import kebabToCamel from "../../../shared/utils/kebabToCamel.js";

const updateCurriculumSection = async (curriculum, section) => {
    const curr = await Curriculums.findByCurriculum(kebabToCamel(curriculum));
    if (!curr) return null;
    const updated = await curr.update(section);
    return updated;
};

export default updateCurriculumSection;
