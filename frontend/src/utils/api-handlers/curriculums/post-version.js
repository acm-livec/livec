import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('postVersion.js');

export const postVersion = async (curriculum, versionData) => {
    try {
        const { data } = await API.post(`/curriculums/${curriculum}/versions`, versionData);
        return data.version;
    } catch (error) {
        log.error(error);
    }
};
