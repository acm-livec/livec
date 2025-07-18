import { API } from '@api/client.js'
import { logger } from '@utils/logger'

const log = logger.create('postLogin.js');

/**
 * Logs in an existing user via the API.
 *
 * @async
 * @function postLogin
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the returned user object.
 */

export const postLogin = async (email, password) => {
    try {
        log.debug("Attempting to login user...", { formData: { email, password } });
        const result = await API.post('auth/login', { email, password });

        const returnedUser = result.data.user
        log.success("Succesfully logged in user!", {returnedUser})

        return returnedUser
    } catch (error) {
        const message = error.response?.data?.message;
        log.error("Error trying to login user:", message);
        throw new Error(message);
    }
};