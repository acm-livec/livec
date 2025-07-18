const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@errors');
const {Roles} = require('@utils/constants')
const AssociateEditors = require('@models/users/associate-editor/editors.model.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')
const Curriculums = require('@models/curriculum/curriculums.model.js')
const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});



const getSuggestionById = async (suggestionId, role = null) => {
    try {

        logger.debug("suggestion.get.db.searching")

        let requestedSuggestion = await Suggestions.findById(suggestionId)

        if (!requestedSuggestion) {
            throw new SuggestionNotFoundError
        }



        if (role) {
            if (role === Roles.COMMUNITY_MEMBER) {
                requestedSuggestion = requestedSuggestion.toCommunityMember()
            } else if (role === Roles.ASSOCIATE_EDITOR) {
                requestedSuggestion = requestedSuggestion.toAssociateEditor()
            } else if (role === Roles.EDITOR_IN_CHIEF) {
                requestedSuggestion = requestedSuggestion.toEditorInCheif()
            }
        }



        const section = await Curriculums.findById(requestedSuggestion.sectionId)


        logger.debug("suggestion.get.found")

        return { ...requestedSuggestion, section }

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = getSuggestionById