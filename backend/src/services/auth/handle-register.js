const CommunityMembers = require('@models/users/community-member/members.model');
const { UserAlreadyExistsError, AppError } = require('@errors');
const Users = require('@models/users/users.model')

const logger = require('@logger').addSource({
    file: 'auth.service',
    method: "handleRegisterUser",
    params: ["name", "email", "password"]
});


const handleRegisterUser = async (name, email, password) => {
    try {

        logger.debug("auth.registration.db.searching")
        const userAlreadyExists = await Users.findGlobalByEmail(email)

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError
        }

        logger.debug("auth.registration.db.inserting")
        const insertedUser = await CommunityMembers.insert({ name, email, password });

        return insertedUser.toPublic?.() ?? insertedUser;

    } catch (error) {

        if (!(error instanceof AppError)) {
            logger.error(error.stack)
        } else {
            logger.warn(error.message, { err: error.errorCode })
        }

        throw error

    }
};


module.exports = { handleRegisterUser }
