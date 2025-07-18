const { AppError, NoAssociateEditorsFoundError } = require('@errors');
const AssociateEditors = require('@models/users/associate-editor/editors.model.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});


const assignAssociateEditorToSuggestion = async (suggestion) => {

    try { logger.start("Assign AE to Suggestion")

        logger.info("suggestion.assign_ae.started")


        logger.debug("suggestion.assign_ae.db.searching", { associatedDiscipline: suggestion.discipline })
        const associateEditorsBySuggestionDiscipline = await AssociateEditors.getByDiscipline(suggestion.discipline);


        if (associateEditorsBySuggestionDiscipline.length === 0) {
            throw new NoAssociateEditorsFoundError
        }

        logger.debug("suggestion.assign_ae.db.found", { numAesFound: associateEditorsBySuggestionDiscipline.length })


        logger.debug("suggestion.assign_ae.selecting")
        const chosenEditor = getOneWithLeastAssignedSuggestions(associateEditorsBySuggestionDiscipline)
        logger.debug("suggestion.assign_ae.selected")


        chosenEditor.assignedSuggestions ||= [];
        if (!chosenEditor.assignedSuggestions.includes(suggestion.id)) {
            chosenEditor.assignedSuggestions.push(suggestion.id);
        } else {
            logger.warn("suggestion.assign_ae.selected.already_contains")
        }

        logger.debug("suggestion.assign_ae.selected.updating")
        await AssociateEditors.update(chosenEditor);

        logger.debug("suggestion.assign_ae.suggestion.updating")
        suggestion.assignAssociateEditor(chosenEditor)
        await Suggestions.update(suggestion)

        logger.success("suggestion.assign_ae.success", { assignedAeId: chosenEditor.id })

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        logger.info("suggestion.assign_ae.failed")

    } finally { logger.end("Assign AE to Suggestion") }
}


const getOneWithLeastAssignedSuggestions = (associateEditorsBySuggestionDiscipline) => {
    return associateEditorsBySuggestionDiscipline.reduce((min, editor) => {
        const minCount = min.assignedSuggestions?.length || 0;
        const currCount = editor.assignedSuggestions?.length || 0;
        return currCount < minCount ? editor : min;
    });
}


module.exports = assignAssociateEditorToSuggestion