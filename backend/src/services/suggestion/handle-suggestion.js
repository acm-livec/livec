const { AppError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')

const linkCommunityMemberToSuggestion = require('./link-user')
const assignAssociateEditorToSuggestion = require('./assign-editor')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "handleNewSuggestion",
    params: ['userId', 'title', 'suggestion', 'discipline']
});


const handleNewSuggestion = async (userId, title, text, discipline, sectionId) => {

    try {

        logger.debug("suggestion.post.db.inserting", {sectionId})
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
        setTimeout(() => { assignAssociateEditorToSuggestion(insertedSuggestion) }, 0);

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

module.exports = handleNewSuggestion