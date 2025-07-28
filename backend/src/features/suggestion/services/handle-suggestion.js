const { AppError, SuggestionNotFoundError } = require('@shared/errors');
const Suggestions = require('@features/suggestion/models/suggestions.model.js')
const Curriculums = require('@features/curriculum/models/curriculums.model.js')
const kebabToCamel = require('@shared/utils/kebabToCamel')

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

        // Assign an Associate Editor and update the curriculum immediately
        await assignAssociateEditorToSuggestion(insertedSuggestion);
        await addToCurriculum(insertedSuggestion.id, sectionId, discipline);

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


const addToCurriculum = async (suggestionId, sectionId, discipline) => {
    try {

        const curriculum = kebabToCamel(discipline)

        logger.debug("curriculum.get.db.searching", { curriculum })


        let requestedCurriculum = await Curriculums.findByCurriculum(curriculum)

        if (!requestedCurriculum) {
            throw new SuggestionNotFoundError
        }
        logger.debug("curriculum.get.db.found")

        const section = await requestedCurriculum.getSectionToc(sectionId)

        if (section.hasOwnProperty('public_feedback')) {
            !section.public_feedback.includes(suggestionId) && section.public_feedback.push(suggestionId)
        } else {
            section.public_feedback = [suggestionId];

        }

        requestedCurriculum.updateToc(section)
        logger.debug("curriculum.toc.updated", { sectionId })
    } catch (error) {
        throw error
    }
}


module.exports = handleNewSuggestion