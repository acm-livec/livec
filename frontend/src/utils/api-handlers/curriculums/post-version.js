import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postVersion.js');

export const postVersion = async (curriculum, changeSets) => {
    try {
        const { data } = await API.post(`/curriculums/${curriculum}/versions`, { changeSets });
        return data.version;
    } catch (error) {
        log.error(error);
    }
};
