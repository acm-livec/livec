import { API } from '@api/client.js';
import { logger } from '@utils/logger';

const log = logger.create('getSection.js');

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
