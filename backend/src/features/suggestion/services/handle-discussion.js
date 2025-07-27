const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@shared/errors');
const Suggestions = require('@features/suggestion/models/suggestions.model.js')
const EditorsInChief = require('@features/users/models/users/editor-in-chief/chiefs.model')
const AssociateEditors = require('@features/users/models/users/associate-editor/editors.model.js')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "handleFinalDiscussion",
    params: ['suggestionId', 'author', 'markdownText']
});



const handleFinalDiscussion = async (id, eicId) => {
    try {
        logger.debug("suggestion.discussion.db.searching", { id, eicId })

        const suggestionToDiscuss = await Suggestions.findById(id)

        if (!suggestionToDiscuss) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.discussion.db.found")

        logger.debug("suggestion.discussion.starting")

        suggestionToDiscuss.startDiscussion(eicId)

        logger.debug("suggestion.discussion.chief.searching", { eicId })
        const chief = await EditorsInChief.findById(eicId)
        logger.debug("suggestion.discussion.chief.found")
        const aes = chief.getAllAssociateEditors()
        logger.debug("suggestion.discussion.board.preparing", { aes })

        const board = [eicId, ...aes]

        suggestionToDiscuss.addBoard(board)
        await Suggestions.update(suggestionToDiscuss)
        logger.debug("suggestion.discussion.finished", { board })


        for (const aid of chief.getAllAssociateEditors()) {
            const ae = await AssociateEditors.findById(aid);
            ae.notifyDiscussion(id);
            await AssociateEditors.update(ae);
        }
    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}




module.exports = handleFinalDiscussion