import { AppError, SuggestionNotFoundError } from "../../../shared/errors/index.js";
import Suggestions from '../models/suggestions.model.js';
import { getCurriculumSection } from "../../curriculum/services/index.js";
import addCurriculumVersion from '../../curriculum/services/add-version.js';
import { generateSectionId } from "../../../shared/utils/generate-id.js";
import kebabToCamel from '../../../shared/utils/kebabToCamel.js';
import baseLogger from '../../../../logger/logger.js';
import db from '../../../database/database.js';

const logger = baseLogger.addSource({
    file: 'suggestion.service',
    method: 'finalizeImplementation',
    params: ['suggestionId', 'eicId', 'notes', 'message']
});
const finalizeImplementation = async (id, eicId, notes, message) => {
    try {
        logger.debug('suggestion.implement.db.searching', { id, eicId });
        const suggestion = await Suggestions.findById(id);
        if (!suggestion) throw new SuggestionNotFoundError();
        logger.debug('suggestion.implement.db.found');

        logger.debug('suggestion.implement.starting');
        suggestion.finalizeImplementation(eicId, notes, message);

        const curriculum = suggestion.discipline;
        const camel = kebabToCamel(curriculum);

        // grab current section before modifying
        const currentSection = await getCurriculumSection(curriculum, suggestion.section_id);

        const newMeta = { ...currentSection.meta, ...suggestion.meta };

        // maintain history of replaced section ids
        newMeta.previous_versions = Array.isArray(newMeta.previous_versions)
            ? [currentSection.id, ...newMeta.previous_versions]
            : [currentSection.id];

        // track the contributing member on the updated section
        newMeta.contributing_member = suggestion.submitter_id;

        if (currentSection) {
            await addCurriculumVersion(curriculum, {
                id: currentSection.id,
                section_version: currentSection.meta?.section_version,
                title: currentSection.title,
                meta: currentSection.meta,
                content: currentSection.content
            });
        }
        const newSectionId = await generateSectionId({
            curriculum: newMeta.curriculum,
            year_version: newMeta.year_version,
            page_number: newMeta.page_number,
            slug: newMeta.slug,
            section_version: newMeta.section_version,
        });

        const tocRef = db.curriculums[camel].tableOfContents;
        const contentRef = db.curriculums[camel].pageContent;
        await tocRef.read();
        await contentRef.read();

        const tocIndex = tocRef.data.findIndex(s => s.id === suggestion.section_id);
        if (tocIndex !== -1) {
            tocRef.data[tocIndex] = {
                ...currentSection,
                id: newSectionId,
                meta: newMeta
            };
        }

        const contIndex = contentRef.data.findIndex(s => s.id === suggestion.section_id);
        if (contIndex !== -1) {
            contentRef.data[contIndex] = {
                id: newSectionId,
                content: suggestion.revised_section
            };
        }

        await tocRef.write();
        await contentRef.write();

        suggestion.section_id = newSectionId;

        logger.debug('suggestion.implement.curriculum.updated');

        await Suggestions.update(suggestion);
        logger.debug('suggestion.implement.finished');
        return true;
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        } else {
            logger.warn(error.message, { err: error.errorCode });
        }
        throw error;
    }
};

export default { finalizeImplementation };
