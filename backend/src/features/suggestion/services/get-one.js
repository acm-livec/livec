const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('../../../shared/errors');
const { Roles } = require('../../../../../docs/constants/roles.js')
const Suggestions = require('../models/suggestions.model.js')
const Curriculums = require('../../curriculum/models/curriculums.model.js')
const kebabToCamel = require('../../../shared/utils/kebabToCamel')
const getUserNameById = require('../../../shared/utils/getUserNameById')
const getUserInfoById = require('../../../shared/utils/getUserInfoById')
const logger = require('../../../../logger/logger.js').addSource({
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
                if (Array.isArray(retS.publicUpdates)) {
                    for (const update of retS.publicUpdates) {
                        if (typeof update.author === 'string' && update.author !== 'LiveC') {
                            update.author = await getUserNameById(update.author)
                        }
                    }
                }
            } else if (role === Roles.ASSOCIATE_EDITOR) {
                retS = requestedSuggestion.toAssociateEditor()
            } else if (role === Roles.EDITOR_IN_CHIEF) {
                retS = requestedSuggestion.toEditorInChief()
            } else if (role === Roles.REVIEWER) {
                retS = requestedSuggestion.toReviewer()
            }
        }

        if (Array.isArray(retS.documentation)) {
            for (const doc of retS.documentation) {
                if (typeof doc.author === 'string' && doc.author !== 'LiveC') {
                    const { name, role: authorRole } = await getUserInfoById(doc.author)
                    doc.authorName = name
                    doc.authorRole = authorRole
                }
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