const { finalizeImplementation } = require('../services');
const { AppError } = require('../../../shared/errors');
const logger = require('../../../../logger/logger.js').addSource({ file: 'suggestion.controller', method: 'postImplementation' });

const postImplementation = async (req, res) => {
    try {
        logger.start('POST Implementation');
        const { id } = req.params;
        const { eicId, notes, message } = req.body;
        await finalizeImplementation(id, eicId, notes, message);
        logger.success('suggestion.implemented');
        return res.status(200).json({ success: true });
    } catch (error) {
        if (!(error instanceof AppError)) {
            logger.error(error.stack);
        }
        return res.status(error.statusCode || 500).json({ success: false, message: error.publicMessage || 'Internal Server Error' });
    } finally {
        logger.end('POST Implementation');
    }
};

module.exports = { postImplementation };
