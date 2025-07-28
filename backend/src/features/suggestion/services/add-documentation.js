import { AppError, SuggestionNotFoundError } from '../../../shared/errors';
import Suggestions from '../models/suggestions.model.js';
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'suggestion.service',
    method: "addNewDocumentationToSuggestion",
    params: ['suggestionId', 'author', 'markdownText']
});



const addNewDocumentationToSuggestion = async (suggestionId, author, markdownText) => {
    try {
        logger.debug("suggestion.add_docs.db.searching", { suggestionId, author })

        const suggestionToAddDocumentation = await Suggestions.findById(suggestionId)

        if (!suggestionToAddDocumentation) {
            throw new SuggestionNotFoundError
        }
        logger.debug("suggestion.add_docs.db.found")

        logger.debug("suggestion.add_docs.starting")
        suggestionToAddDocumentation.insertDocumentation(null, author, markdownText)
        await Suggestions.update(suggestionToAddDocumentation)
        logger.debug("suggestion.add_docs.finished")



    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}


module.exports = addNewDocumentationToSuggestion