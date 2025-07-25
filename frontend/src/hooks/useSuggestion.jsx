import { useState, useEffect, useContext } from "react"
import { UserContext } from '@context/UserProvider';
import { postSuggestion } from "@utils/api-handlers/suggestions";
import { API } from '@api/client.js'
import { logger, setCorrelationId } from '@utils/logger'

const log = logger.create('useSuggestion.js');




export default function useSuggestion() {
    const { user } = useContext(UserContext)
    const [response, setResponse] = useState(null)
    const [suggestions, setSuggestions] = useState([])



    useEffect(() => {
        (async function () {
            try {
                if (!user) return
                const response = API.get(`/user/${user.role}/${user.id}/suggestions`)
                const { data } = await response
                setSuggestions(data.suggestions)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, [])








    const submit = async ({ title, text, discipline, sectionId }) => {
        try {

            setCorrelationId('submit-suggestion')
            logger.groupCollapsed("Submit Suggestion Flow")
            const res = await postSuggestion(user.id, title, text, discipline, sectionId)
            setResponse(res);
        } catch (error) {
            log.error(error)
            setResponse({ success: false })
        }
    }




    return {submit, suggestions, response, setResponse}
}
