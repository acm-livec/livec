import { logger } from '@utils/logger';

// Central logger for all API handlers to avoid redundant instances
export const apiLog = logger.create('api');
