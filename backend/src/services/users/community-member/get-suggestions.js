const { AppError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')

const logger = require('@logger').addSource({
    file: 'community-member.service',
    method: "getAllCommunityMemberSuggestions",
    params: ['userId']
});


const getAllCommunityMemberSuggestions = async (userId) => {
    
    try {

        logger.debug(`cm.suggestions.get.db.searching`)
        const suggestions = await Suggestions.getByCommunityMemberId(userId)

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

module.exports = getAllCommunityMemberSuggestions