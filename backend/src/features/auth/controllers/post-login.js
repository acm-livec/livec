import { handleLoginUser } from "../services/index.js";
import { AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'auth.controller',
    method: "postLogin",
    params: ["req.body"]
})


export const postLogin = async (req, res) => {
    logger.start('Login')

    try {

        const { email, password } = req.body;

        logger.info('auth.login.started', { email })
        const requestedUser = await handleLoginUser(email, password)

        logger.success("auth.login.success", { returnedUserId: requestedUser.id })
        return res.status(200).json({ success: true, user: { ...requestedUser } });

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`auth.login.failed`, { err: error.message })
        } else {
            logger.info(`auth.login.failed`, { err: error.errorCode })
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("Login") }
}


