const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@errors');
const { Roles } = require('@utils/constants')
const AssociateEditors = require('@models/users/associate-editor/editors.model.js')
const Suggestions = require('@models/suggestion/suggestions.model.js')
const Curriculums = require('@models/curriculum/curriculums.model.js')


const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}


const getFullCurriculum = async (curriculum) => {
    try {

        logger.debug("curriculum.get.db.searching")

        curriculum = kebabToCamel(curriculum)

        logger.debug("curriculum.get.db.searching", { curriculum })


        let requestedCurriculum = await Curriculums.findByCurriculum(curriculum)

        if (!requestedCurriculum) {
            throw new SuggestionNotFoundError
        }


        const allSections = await requestedCurriculum.returnAll()

        const builtSections = await Promise.all(
            allSections.map(async item => {
                if (item.hasOwnProperty('public_feedback')) {
                    console.log("yes")
                    return {
                        ...item,
                        public_feedback: await Suggestions.getBySectionId(item.id)
                    };
                }

                return {
                    ...item
                };
            })
        );

        return builtSections




    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error
    }
}

module.exports = getFullCurriculum