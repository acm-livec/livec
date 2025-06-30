const { UserNotFoundError, PasswordMismatchError, AppError } = require('@errors');
const Users = require('@models/users/users.model.js')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "handleLoginUser",
    params: ["email, password"]
})


const handleLoginUser = async (email, password) => {

    try {

        logger.debug('auth.login.db.searching')
        const requestedUser = await Users.findGlobalByEmail(email);

        if (requestedUser) {

            logger.debug('auth.login.password.verifying')
            if (!requestedUser.comparePasswords(password)) {
                throw new PasswordMismatchError
            }

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

module.exports = { handleLoginUser }
