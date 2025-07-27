import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const postVersion = async (curriculum, changeSets) => {
    try {
        const { data } = await API.post(`/curriculums/${curriculum}/versions`, {
            changeSets,
        });
        return data.version;
    } catch (error) {
        log.error(error);
    }
};
