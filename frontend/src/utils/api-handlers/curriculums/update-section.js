import { API } from '@api/client.js';
import { apiLog as log } from '../apiLogger';

export const updateSection = async (curriculum, sectionId, data) => {
    try {
        await API.put(`/curriculums/${curriculum}/sections/${sectionId}`, data);
        log.success('section.updated', { sectionId });
    } catch (error) {
        log.error(error);
    }
};
