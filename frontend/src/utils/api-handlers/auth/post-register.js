import { API } from '@api/client.js'
import { logger } from '@utils/logger'

const log = logger.create('postRegister.js');

/**
 * Registers a new user via the API.
 *
 * @async
 * @function postRegister
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the inserted user object.
 */

export const postRegister = async (name, email, password) => {
    try {
        log.debug("Attempting to register new user...", { formData: { name, email, password } })
        const result = await API.post('auth/register', { name, email, password })

        const insertedUser = result.data.user
        log.success("Successfully registered new user!", insertedUser);

        return insertedUser
    
    } catch (error) {
        const message = error.response?.data?.message;
        log.error("Error trying to register user:", message);
        throw new Error(message);
    }
}