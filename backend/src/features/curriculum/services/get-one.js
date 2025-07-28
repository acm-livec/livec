const { AppError, SuggestionNotFoundError } = require('../../../shared/errors');

const Suggestions = require('../../suggestion/models/suggestions.model.js')
const Curriculums = require('../models/curriculums.model.js')
const kebabToCamel = require('../../../shared/utils/kebabToCamel')


const logger = require('../../../../logger/logger.js').addSource({
    file: 'auth.service',
    method: "assignAssociateEditorToSuggestion",
    params: ['suggestion']
});



const getFullCurriculum = async (curriculum) => {
    try {


        curriculum = kebabToCamel(curriculum)

        logger.debug("curriculum.get.db.searching")


        let requestedCurriculum = await Curriculums.findByCurriculum(curriculum)

        if (!requestedCurriculum) {
            throw new SuggestionNotFoundError
        }

        logger.debug("curriculum.get.db.found")

        logger.debug("curriculum.get.all-sections.started")

        const allSections = await requestedCurriculum.returnAll()

        logger.debug("curriculum.get.all-sections.done", { numSections: allSections.length })

        logger.debug("curriculum.get.build-sections.started")

        const builtSections = await Promise.all(
            allSections.map(async item => {
                if (item.hasOwnProperty('public_feedback')) {
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

        logger.debug("curriculum.get.build-sections.done")


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