const { AppError } = require('../../../../../shared/errors');
const Suggestions = require('../../../../suggestion/models/suggestions.model.js')

const logger = require('../../../../../../logger/logger.js').addSource({
    file: 'community-member.service',
    method: "getAllCommunityMemberSuggestions",
    params: ['userId']
});


const getFinalizedSuggestions = async (userId) => {
    
    try {

        logger.debug(`eic.suggestions.get.db.searching`)
        const suggestions = await Suggestions.getFinalized(userId)

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

module.exports = getFinalizedSuggestions