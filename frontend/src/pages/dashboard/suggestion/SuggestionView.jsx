import { UserContext } from '@context/UserProvider';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuggestion } from '@utils/api-handlers/suggestions';

import DefaultView from './DefaultView';
import FullView from './FullView'
import NewView from './NewView';

import Suggestion from '@context/Suggestion';


export default function SuggestionView() {
    const { user } = useContext(UserContext);
    const { suggestionId } = useParams();

    const navigate = useNavigate()

    /** @type {[Suggestion, Function]} */
    const [suggestion, setSuggestion] = useState()

    const [loading, setLoading] = useState(true)



    useEffect(() => {
        getSuggestion(suggestionId, user.role)
            .then(res => setSuggestion(new Suggestion(res)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [suggestionId]);



    if (loading) {
        return <p style={{ color: 'black' }}>Loading...</p>;
    }


    /* If a suggestion could not be found or retrieved or does not have an Id */

    if (!suggestion || !suggestion.id) {
        return (
            <div style={{ color: 'black' }}>
                <h1>No suggestion found.</h1>
                <button onClick={() => navigate(`/dashboard/${user?.id || ''}`)}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (user.isCommunityMember || suggestion.isClosed) 
        return <DefaultView suggestion={suggestion} user={user}/>

    if (suggestion.isNew) 
        return <NewView suggestion={suggestion}/>

    return <FullView suggestion={suggestion} user={user}/>

}
