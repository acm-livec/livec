import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const postRecommednation = async (
    suggestionId,
    reviewerId,
    { decision, notes }
) => {
    try {
        await API.post(`/suggestion/${suggestionId}/post-recommendation`, {
            reviewerId,
            decision,
            notes,
        });
    } catch (error) {
        log.error(error);
    }
};
