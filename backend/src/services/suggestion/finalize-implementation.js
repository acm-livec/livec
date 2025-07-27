const { AppError, SuggestionNotFoundError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js');
const { updateCurriculumSection } = require('@services/curriculum');

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: 'finalizeImplementation',
    params: ['suggestionId', 'eicId', 'notes', 'message']
});

const finalizeImplementation = async (id, eicId, notes, message) => {
    try {
        logger.debug('suggestion.implement.db.searching');
        const suggestion = await Suggestions.findById(id);
        if (!suggestion) throw new SuggestionNotFoundError();

        suggestion.finalizeImplementation(eicId, notes, message);
        await updateCurriculumSection(suggestion.discipline, {
            id: suggestion.section_id,
            content: suggestion.revised_section,
        });

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
