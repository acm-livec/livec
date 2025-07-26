import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postSuggestion.js');

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
        logger.error(error);
    }
};
