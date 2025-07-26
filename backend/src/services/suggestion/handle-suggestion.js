const { AppError, SuggestionNotFoundError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
const Curriculums = require('@models/curriculum/curriculums.model.js')

const linkCommunityMemberToSuggestion = require('./link-user')
const assignAssociateEditorToSuggestion = require('./assign-editor')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "handleNewSuggestion",
    params: ['userId', 'title', 'suggestion', 'discipline']
});


const handleNewSuggestion = async (userId, title, text, discipline, sectionId) => {

    try {

        logger.debug("suggestion.post.db.inserting", { sectionId, discipline })
        const insertedSuggestion = await Suggestions.insert({
            submitterId: userId,
            title,
            text,
            discipline,
            sectionId,
        })

        logger.info("suggestion.post.link_user.started")
        await linkCommunityMemberToSuggestion(userId, insertedSuggestion.id)
        logger.info("suggestion.post.link_user.completed")

        // Set timeout so process headers are kept seperate
        setTimeout(() => { assignAssociateEditorToSuggestion(insertedSuggestion); addToCurriculum(insertedSuggestion.id, sectionId, discipline) }, 10);

        return insertedSuggestion.id

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

const addToCurriculum = async (suggestionId, sectionId, discipline) => {
    try {

        const curriculum = kebabToCamel(discipline)

        logger.debug("curriculum.get.db.searching", { curriculum })


        let requestedCurriculum = await Curriculums.findByCurriculum(curriculum)

        if (!requestedCurriculum) {
            throw new SuggestionNotFoundError
        }

        const section = await requestedCurriculum.getSectionToc(sectionId)

        if (section.hasOwnProperty('public_feedback')) {
            !section.public_feedback.includes(suggestionId) && section.public_feedback.push(suggestionId)
        } else {
            section.public_feedback = [suggestionId];

        }

        requestedCurriculum.updateToc(section)
    } catch (error) {

    }
}


module.exports = handleNewSuggestion