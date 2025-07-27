const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@errors');
const { Roles } = require('@docs/constants/roles.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')
const Curriculums = require('@models/curriculum/curriculums.model.js')
const kebabToCamel = require('@utils/kebabToCamel')
const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});


const getSuggestionById = async (suggestionId, role = null) => {
    try {

        logger.debug("suggestion.get.db.searching", { suggestionId })

        const requestedSuggestion = await Suggestions.findById(suggestionId)

        if (!requestedSuggestion) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.get.db.found")
        let retS



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
        logger.debug("suggestion.get.curriculum.searching", { curri })
        const c = await Curriculums.findByCurriculum(curri)
        logger.debug("suggestion.get.curriculum.found")

        logger.debug("suggestion.get.section.searching", { secId })
        const section = await c.getSection(secId)
        logger.debug("suggestion.get.section.found")

        logger.debug("suggestion.get.found")

        logger.debug("suggestion.get.finished")
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