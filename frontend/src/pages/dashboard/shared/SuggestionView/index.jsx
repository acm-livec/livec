import { UserContext } from '@context/UserProvider';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SuggestionView.module.scss';
import { Status, Roles, statusMap } from '@utils/constants';
import { getSuggestion } from '@utils/api-handlers/suggestions';



import CommunityMemberView from './community-member/CommunityMemberView';
import AssociateEditorView from './associate-editor/AssociateEditorView';
import EditorInChiefView from './editor-in-chief/default-view';

export default function SugestionView() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [suggestion, setSuggestion] = useState({})
    const [loading, setLoading] = useState(true)
    const { suggestionId } = useParams();



    useEffect(() => {
        getSuggestion(suggestionId, user.role)
            .then(res => setSuggestion(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [suggestionId]);



    if (loading) {
        return <p style={{ color: 'black' }}>Loading...</p>;
    }



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



    return (
        <>
            {user.role === Roles.COMMUNITY_MEMBER && <CommunityMemberView suggestion={suggestion} user={user} />}
            {user.role === Roles.ASSOCIATE_EDITOR && <AssociateEditorView suggestion={suggestion} user={user} />}
            {user.role === Roles.EDITOR_IN_CHIEF && <EditorInChiefView suggestion={suggestion} user={user} />}
        </>
    );
}


