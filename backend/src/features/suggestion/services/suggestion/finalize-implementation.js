const { AppError, SuggestionNotFoundError } = require('@shared/errors');
const Suggestions = require('@features/suggestion/models/suggestions.model.js');
const { updateCurriculumSection } = require('@features/curriculum/services');

const logger = require('@logger').addSource({
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
        logger.debug('suggestion.implement.curriculum.updating');
        await updateCurriculumSection(suggestion.discipline, {
            id: suggestion.section_id,
            content: suggestion.revised_section,
        });
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

module.exports = finalizeImplementation;
