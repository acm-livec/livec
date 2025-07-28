const { AppError } = require('../../../../../shared/errors');
const Suggestions = require('../../../../suggestion/models/suggestions.model.js')
const getUserNameById = require('../../../../../shared/utils/getUserNameById')

const logger = require('../../../../../../logger/logger.js').addSource({
    file: 'community-member.service',
    method: "getAllCommunityMemberSuggestions",
    params: ['userId']
});


const getAllCommunityMemberSuggestions = async (userId) => {
    
    try {

        logger.debug(`cm.suggestions.get.db.searching`)
        const suggestions = await Suggestions.getByCommunityMemberId(userId)

        for (const suggestion of suggestions) {
            if (Array.isArray(suggestion.publicUpdates)) {
                for (const update of suggestion.publicUpdates) {
                    if (typeof update.author === 'string' && update.author !== 'LiveC') {
                        update.author = await getUserNameById(update.author)
                    }
                }
            }
        }

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