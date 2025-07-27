const { AppError, SuggestionNotFoundError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
const { updateCurriculumSection } = require('@services/curriculum');

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "updateVote",
    params: ['suggestionId', 'author', 'markdownText']
});



const updateVote = async ({ id, userId, formData }) => {
    try {

        logger.debug("suggestion.change.db.searching", { id, userId, formData })
        const { decision, notes } = formData
        logger.debug("...", { decision, notes })
        const suggestionToVoteOn = await Suggestions.findById(id)

        if (!suggestionToVoteOn) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.change.starting")

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

            const result = suggestionToVoteOn.finalizeIfComplete()
            if (result === 'accepted') {
                await updateCurriculumSection(
                    suggestionToVoteOn.discipline,
                    {
                        id: suggestionToVoteOn.section_id,
                        content: suggestionToVoteOn.revised_section,
                    }
                )
            }
        }

        const ups = await Suggestions.update(suggestionToVoteOn)
        const didVote = ups.didVote(userId)
        const ret = ups.toAssociateEditor()
        ret.voted = didVote

        logger.debug("suggestion.change.finished")
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