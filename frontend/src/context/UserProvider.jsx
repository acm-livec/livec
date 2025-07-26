import { createContext, useState, useEffect } from 'react';
import User from './User'; // adjust to your alias/path

/**
 * This context serves to identify wether a user is signed in or not
 * which restricts certain features. If a user is signed in, the users
 * data can be accessed with the @user object.
 *
 */

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const handleUser = (rawUser) => {
        const hydrated = new User(rawUser);
        sessionStorage.setItem('user', JSON.stringify(rawUser));
        setUser(hydrated);
    };

    useEffect(() => {
        try {
            const sessionUser = sessionStorage.getItem('user');
            if (sessionUser) {
                const parsed = JSON.parse(sessionUser);
                setUser(new User(parsed)); // rehydrate
            }
        } catch (error) {
            console.error('Error in user context:', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, handleUser, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
