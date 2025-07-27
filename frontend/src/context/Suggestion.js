// src/models/User.js
import { Status } from '@utils/constants';
import {
    isTerminalStatus,
    SystemStatus,
} from '@docs/constants/status';

/**
 * @type {Suggestion}
 */
export default class Suggestion {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    /** Check if user has a given role */
    get isNew() {
        return this.system?.status === Status.System.PENDING_ASSIGNMENT;
    }

    get isClosed() {
        return isTerminalStatus(this.system?.status);
    }
    isDeferred() {
        return this.system?.status === Status.System.EXTERNAL_REVIEW;
    }

    inFinalPhase() {
        return this.system?.status === SystemStatus.IN_BOARD_DISCUSSION;

    }
}
