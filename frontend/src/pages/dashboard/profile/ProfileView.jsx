import React from 'react';
import { UserContext } from '@context/UserProvider';
import { useContext } from 'react';

/**
 * Displays the info of the retrieved user.
 *
 * Only for dev/deubgging purposes and will be removed or hidden
 * when final product has to be presented.
 *
 * @returns {React.ReactElement}
 */
export default function ProfileView() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <pre>{JSON.stringify(user, null, 4)}</pre>
        </div>
    );
}
