import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const getSection = async (curriculum, sectionId) => {
    try {
        const { data } = await API.get(
            `/curriculums/${curriculum}/sections/${sectionId}`
        );
        return data.section;
    } catch (error) {
        log.error(error);
    }
};
