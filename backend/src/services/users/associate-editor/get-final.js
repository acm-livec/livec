
const { AppError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
    file: 'community-member.service',
    method: "getFinalAssociateEditorAssignedSuggestions",
    params: ['userId']
});


const getFinalAssociateEditorAssignedSuggestions = async (userId) => {

    try {

        logger.debug(`ae.suggestions.get.db.searching`, { userId })
        const suggestions = await Suggestions.getByFinalAssociateEditor(userId)

        return suggestions

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = getFinalAssociateEditorAssignedSuggestions