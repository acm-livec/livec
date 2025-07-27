const { AppError, NoUserWithIdError } = require('@shared/errors');
const CommunityMembers = require('@features/users/models/community-member/members.model');

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "linkCommunityMemberToSuggestion",
    params: ['userId', 'suggestionId']
});


async function linkCommunityMemberToSuggestion(userId, suggestionId) {

    try {

        logger.debug("suggestion.post.link_user.db.searching", { userId, suggestionId })
        const submittedBy = await CommunityMembers.findById(userId);
        if (!submittedBy) throw NoUserWithIdError
        logger.debug("suggestion.post.link_user.db.found")

        logger.debug("suggestion.post.link_user.db.linking")
        submittedBy.addSuggestion(suggestionId);
        await CommunityMembers.update(submittedBy);

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = linkCommunityMemberToSuggestion;
