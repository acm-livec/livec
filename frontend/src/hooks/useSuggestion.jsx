import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@context/UserProvider';
import { postSuggestion } from '@utils/api-handlers/suggestions';
import { API } from '@api/client.js';

export default function useSuggestion() {
    const { user } = useContext(UserContext);
    const [response, setResponse] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [finalSuggestions, setFinalSuggestions] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                if (!user) return;
                const response = API.get(
                    `/user/${user.role}/${user.id}/suggestions`
                );
                const { data } = await response;
                setSuggestions(data.suggestions);
            } catch {
                // Failed to fetch suggestions
            }
        })();
    }, [user]);

    useEffect(() => {
        (async function () {
            try {
                if (!user) return;
                const response = API.get(
                    `/user/${user.role}/${user.id}/suggestions/final`
                );
                const { data } = await response;
                setFinalSuggestions(data.suggestions);
            } catch {
                // Failed to fetch suggestions
            }
        })();
    }, [user]);

    const submit = async ({ title, text, discipline, sectionId }) => {
        try {
            const res = await postSuggestion(
                user.id,
                title,
                text,
                discipline,
                sectionId
            );
            setResponse(res);
        } catch {
            setResponse({ success: false });
        }
    };

    return { submit, suggestions, response, setResponse, finalSuggestions };
}
