import { finalizeImplementation } from "../services/index.js";
import { AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';
const logger = baseLogger.addSource({ file: 'suggestion.controller', method: 'postImplementation' });

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

export { postImplementation };
