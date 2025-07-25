import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('updateSection.js');

export const updateSection = async (curriculum, sectionId, data) => {
    try {
        await API.put(`/curriculums/${curriculum}/sections/${sectionId}`, data);
        log.success('section.updated', { sectionId });
    } catch (error) {
        log.error(error);
    }
};
