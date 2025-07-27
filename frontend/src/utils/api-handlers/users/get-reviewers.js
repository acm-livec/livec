import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const getReviewers = async (id) => {
    try {
        const response = await API.get(
            `/user/associate-editor/${id}/reviewers`
        );

        const { reviewers } = response.data;
        return reviewers;
    } catch (error) {
        log.error(error);
    }
};
