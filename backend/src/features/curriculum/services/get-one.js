const { AppError, NoAssociateEditorsFoundError, SuggestionNotFoundError } = require('@shared/errors');
const { Roles } = require('@docs/constants/roles.js')
const AssociateEditors = require('@features/users/models/users/associate-editor/editors.model.js')
const Suggestions = require('@features/suggestion/models/suggestions.model.js')
const Curriculums = require('@features/curriculum/models/curriculums.model.js')
const kebabToCamel = require('@shared/utils/kebabToCamel')


const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});



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