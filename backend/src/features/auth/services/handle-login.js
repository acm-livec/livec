import { UserNotFoundError, PasswordMismatchError, AppError } from "../../../shared/errors/index.js";
import baseLogger from '../../../../logger/logger.js';

const logger = baseLogger.addSource({
    file: 'auth.service',
    method: "handleLoginUser",
    params: ["email, password"]
})


const handleLoginUser = async (email, password) => {

    try {

        logger.debug('auth.login.db.searching')
        const requestedUser = await Users.findGlobalByEmail(email);

        if (requestedUser) {
            logger.debug('auth.login.db.found')

            logger.debug('auth.login.password.verifying')
            if (!requestedUser.comparePasswords(password)) {
                throw new PasswordMismatchError
            }

            logger.debug('auth.login.password.matched')
            return requestedUser;
        }

        throw new UserNotFoundError

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.message)
        } else {
            logger.warn(error.message)
        }

        throw error
    }

};

export { handleLoginUser };
