const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@errors');
const {Roles} = require('@utils/constants')
const Suggestions = require('@models/suggestion/suggestions.model.js')
const Curriculums = require('@models/curriculum/curriculums.model.js')
const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

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
            } else if (role === Roles.REVIEWER) {
                requestedSuggestion = requestedSuggestion.toReviewer()
            }
        }


        const curri = kebabToCamel(requestedSuggestion.discipline)
        const secId = requestedSuggestion.sectionId
        const c = await Curriculums.findByCurriculum(curri)


        const section = await c.getSection(secId)

        logger.debug( section)

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