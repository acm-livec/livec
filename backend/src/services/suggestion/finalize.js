const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
const EditorsInChief = require('@models/users/editor-in-chief/chiefs.model')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "associateEditorFinalized",
    params: ['suggestionId', 'author', 'markdownText']
});



const associateEditorFinalized = async (suggestionId, associateEditor, updatedSection) => {
try {

        logger.debug("suggestion.finalize.db.searching")

        const suggestionToFinalize = await Suggestions.findById(suggestionId)

        if (!suggestionToFinalize) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.finalize.starting")

        suggestionToFinalize.associateEditorFinalized(associateEditor, updatedSection)

        await Suggestions.update(suggestionToFinalize)
        logger.debug("suggestion.finalize.finished")

        const eic = suggestionToFinalize.assigned_editor_in_chief

        const eicToNotify = await EditorsInChief.findById(eic)

        if (!eicToNotify) {
            throw new NoUserWithIdError
        }

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



const notifyEditorInChief = () => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = associateEditorFinalized