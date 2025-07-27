import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postImplementation.js');

export const postImplementation = async (id, eicId, notes, message) => {
    try {
        await API.post(`/suggestion/${id}/implement`, { eicId, notes, message });
        log.success('implementation.submitted');
    } catch (error) {
        log.error(error);
    }
};
