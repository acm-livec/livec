const { AppError, NoUserWithIdError } = require('@errors');
const CommunityMembers = require('@models/users/community-member/members.model');

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "linkCommunityMemberToSuggestion",
    params: ['userId', 'suggestionId']
});


async function linkCommunityMemberToSuggestion(userId, suggestionId) {

    try {

        logger.debug("suggestion.post.link_user.db.searching")
        const submittedBy = await CommunityMembers.findById(userId);
        if (!submittedBy) throw NoUserWithIdError

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
