const { AppError, SuggestionNotFoundError } = require('@shared/errors');
const Suggestions = require('@features/suggestion/models/suggestions.model.js')
const { updateCurriculumSection } = require('@features/curriculum/services');

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "updateVote",
    params: ['suggestionId', 'author', 'markdownText']
});



const updateVote = async ({ id, userId, formData }) => {
    try {

        logger.debug("suggestion.vote.db.searching", { id, userId })
        const { decision, notes } = formData
        const suggestionToVoteOn = await Suggestions.findById(id)

        if (!suggestionToVoteOn) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.vote.db.found")

        logger.debug("suggestion.vote.starting")

        const content = [
            {
                type: 'p',
                children: [{ text: notes }]
            }
        ]

        if (suggestionToVoteOn.didVote(userId)) {
            logger.debug('suggestion.already.voted')
        } else {
            suggestionToVoteOn.updateVote(userId, decision, content)

            suggestionToVoteOn.finalizeIfComplete()

        }

        const ups = await Suggestions.update(suggestionToVoteOn)
        const ret = ups.toAssociateEditor()

        logger.debug("suggestion.vote.finished")
        return ret




    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}





module.exports = updateVote