import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const postRecommednation = async (
    suggestionId,
    reviewerId,
    { decision, notes }
) => {
    try {
        const response = await API.post(
            `/suggestion/${suggestionId}/post-recommendation`,
            {
                reviewerId,
                decision,
                notes,
            }
        );
        const { success, message } = response.data;
        log.success(message);
        return success;
    } catch (error) {
        log.error(error);
    }
};
