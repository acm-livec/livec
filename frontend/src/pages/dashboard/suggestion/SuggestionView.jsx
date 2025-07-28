import { UserContext } from '@context/UserProvider';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuggestion } from '@utils/api-handlers/suggestions';

import DefaultView from './DefaultView';
import FullView from './FullView';
import NewView from './NewView';

import Suggestion from '@context/Suggestion';
import FinalView from '../board/FinalView';
import { Status, isTerminalStatus } from '@docs/constants/status';

export default function SuggestionView() {
    const { user } = useContext(UserContext);
    const { suggestionId } = useParams();

    const navigate = useNavigate();

    /** @type {[Suggestion, Function]} */
    const [suggestion, setSuggestion] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSuggestion(suggestionId, user.role)
            .then((res) => setSuggestion(new Suggestion(res)))
            .catch((err) => console.error(err))
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
                <button onClick={() => navigate(`/dashboard/${user?.id || ''}`)}>Back to Dashboard</button>
            </div>
        );
    }

    const systemStatus = suggestion.system?.status;

    const isClosed = isTerminalStatus(systemStatus);
    const isDeferred = systemStatus === Status.System.EXTERNAL_REVIEW;
    const isNew = systemStatus === Status.System.PRELIMINARY_REVIEW;
    const isFinal = systemStatus === Status.System.IN_BOARD_DISCUSSION;
    const ready = systemStatus === Status.System.READY_FOR_IMPLEMENTATION;

    console.log({ isClosed, isDeferred, isNew, isFinal });

    if (user.isCommunityMember || isClosed || (user.isAssociateEditor() && isDeferred)) return <DefaultView suggestion={suggestion} user={user} />;

    if (isNew) return <NewView suggestion={suggestion} />;

    if (isFinal) return <FinalView suggestion={suggestion} user={user} />;

    if (ready) return <DefaultView suggestion={suggestion} user={user} />;

    return <FullView suggestion={suggestion} user={user} />;
}
