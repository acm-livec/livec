const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@errors');
const { Roles } = require('@utils/constants')
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

        const requestedSuggestion = await Suggestions.findById(suggestionId)
        let retS
        if (!requestedSuggestion) {
            throw new SuggestionNotFoundError
        }



        if (role) {
            if (role === Roles.COMMUNITY_MEMBER) {
                retS = requestedSuggestion.toCommunityMember()
            } else if (role === Roles.ASSOCIATE_EDITOR) {
                retS = requestedSuggestion.toAssociateEditor()
            } else if (role === Roles.EDITOR_IN_CHIEF) {
                retS = requestedSuggestion.toEditorInCheif()
            } else if (role === Roles.REVIEWER) {
                retS = requestedSuggestion.toReviewer()
            }
        }


        const curri = kebabToCamel(retS.discipline)
        const secId = retS.sectionId
        const c = await Curriculums.findByCurriculum(curri)

        const section = await c.getSection(secId)
        logger.debug('suggestion.get.gett', { curri, secId })

        logger.debug(JSON.stringify(section))

        logger.debug("suggestion.get.found")


        return { ...retS, section }

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