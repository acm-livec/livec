import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { UserContext } from '@context/UserProvider';
import { postLogin, postRegister } from '@utils/api-handlers/auth';

/**
 * Custom hook that deals with login and register logic with the help
 * of util files.
 *
 **/

export default function useAuth() {
    const { handleUser, setUser } = useContext(UserContext);
    const [message, setMessage] = useState(''); // Message displayed in Auth form in case of error
    const navigate = useNavigate();

    const login = async ({ email, password }) => {
        try {
            const user = await postLogin(email, password);

            if (user) {
                await handleUser(user);
                navigate(`/dashboard/${user.id}`);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const register = async ({ name, email, password }) => {
        try {
            const user = await postRegister(name, email, password);

            if (user) {
                await handleUser(user);
                navigate(`/dashboard/${user.id}`);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/auth');
    };

    return { register, login, logout, setMessage, message };
}
