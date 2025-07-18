import { API } from '@api/client.js'
import { logger } from '@utils/logger'

const log = logger.create('getReviewers.js');

export const getReviewers = async (id) => {
    try {
        const response = await API.get(`/user/associate-editor/${id}/reviewers`)

        const { reviewers } = response.data
        return reviewers
    } catch (error) {
        log.error(error)
    }
}