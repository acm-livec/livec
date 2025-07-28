
const { AppError } = require('../../../../../shared/errors');
const Suggestions = require('../../../../suggestion/models/suggestions.model.js')

const logger = require('../../../../../../logger/logger.js').addSource({
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