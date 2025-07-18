const { handleRegisterUser } = require('@services/auth')
const { AppError } = require('@errors');

const logger = require('@logger').addSource({
    file: 'auth.controller',
    method: "postRegister",
    params: ["req.body"]
});


const postRegister = async (req, res) => {
    logger.start("Register")
    try {

        const { name, email, password } = req.body;

        logger.info("auth.registration.started", { name, email })
        const newUser = await handleRegisterUser(name, email, password)

        logger.success('auth.registration.started', { newUserId: newUser.id })
        return res.status(200).json({ success: true, user: { ...newUser } });

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(`auth.registration.failed`, { err: error.message })
        } else {
            logger.info(`auth.registration.failed`)
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.publicMessage || 'Internal Server Error'
        });

    } finally { logger.end("Register") }
}


module.exports = { postRegister }