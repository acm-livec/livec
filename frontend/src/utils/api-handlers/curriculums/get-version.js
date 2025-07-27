import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const getVersion = async (curriculum, versionId) => {
    try {
        const { data } = await API.get(`/curriculums/${curriculum}/versions/${versionId}`);
        return data.version;
    } catch (error) {
        log.error(error);
    }
};
