const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('../../../shared/errors');
const Suggestions = require('../models/suggestions.model.js')
const EditorsInChief = require('../../users/models/users/editor-in-chief/chiefs.model')

const logger = require('../../../../logger/logger.js').addSource({
    file: 'suggestion.service',
    method: "associateEditorFinalized",
    params: ['suggestionId', 'author', 'markdownText']
});



const associateEditorFinalized = async (suggestionId, associateEditor, updatedSection) => {
    try {

        logger.debug("suggestion.finalize.db.searching", { suggestionId })

        const suggestionToFinalize = await Suggestions.findById(suggestionId)

        if (!suggestionToFinalize) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.finalize.db.found")

        logger.debug("suggestion.finalize.starting")

        suggestionToFinalize.associateEditorFinalized(associateEditor, updatedSection)

        await Suggestions.update(suggestionToFinalize)
        logger.debug("suggestion.finalize.finished")

        const eic = suggestionToFinalize.assigned_editor_in_chief
        logger.debug("suggestion.finalize.notify.db.searching", { eic })
        const eicToNotify = await EditorsInChief.findById(eic)

        if (!eicToNotify) {
            throw new NoUserWithIdError
        }
        logger.debug("suggestion.finalize.notify.db.found")

        eicToNotify.assignSuggestion(suggestionId)

        await EditorsInChief.update(eicToNotify)



    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}






module.exports = associateEditorFinalized