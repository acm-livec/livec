const { AppError, SuggestionNotFoundError, NoUserWithIdError } = require('@errors');
const Suggestions = require('@models/suggestion/suggestions.model.js')
const EditorsInChief = require('@models/users/editor-in-chief/chiefs.model')
const AssociateEditors = require('@models/users/associate-editor/editors.model.js')

const logger = require('@logger').addSource({
    file: 'suggestion.service',
    method: "handleFinalDiscussion",
    params: ['suggestionId', 'author', 'markdownText']
});



const handleFinalDiscussion = async (id, eicId) => {
    try {

        logger.debug("suggestion.approve.db.searching")

        const suggestionToDiscuss = await Suggestions.findById(id)

        if (!suggestionToDiscuss) {
            throw new SuggestionNotFoundError
        }

        logger.debug("suggestion.approve.starting")

        suggestionToDiscuss.startDiscussion(eicId)
        logger.debug("suggestion.approve.getc")

        const chief = await EditorsInChief.findById(eicId)
        const aes = chief.getAllAssociateEditors()
        logger.debug("suggestion.approve.finished", { aes })

        const board = [eicId, ...aes]
        logger.debug("suggestion.approve.got-board")

        suggestionToDiscuss.addBoard(board)
        await Suggestions.update(suggestionToDiscuss)
        logger.debug("suggestion.approve.finished", { board })


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