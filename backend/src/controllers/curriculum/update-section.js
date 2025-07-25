const { updateCurriculumSection } = require('@services/curriculum');
const { AppError } = require('@errors');
const logger = require('@logger').addSource({ file: 'curriculum.controller', method: 'updateSection' });

const updateSection = async (req, res) => {
    try {
        logger.start('UPDATE Curriculum Section');
        const { curriculum, sectionId } = req.params;
        const section = { ...req.body, id: sectionId };
        const updated = await updateCurriculumSection(curriculum, section);
        logger.success('curriculum.section.updated');
        return res.status(200).json({ success: true, section: updated });
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        }
        return res.status(error.statusCode || 500).json({ success: false, message: error.publicMessage || 'Internal Server Error' });
    } finally {
        logger.end('UPDATE Curriculum Section');
    }
};

module.exports = { updateSection };
