/**
 * Public statuses shown to suggestion submitters.
 * @readonly
 * @enum {string}
 */
export const PublicStatus = Object.freeze({

    /** Suggestion has been submitted. */
    SUBMITTED: 'submitted',

    /** Suggestion was rejected by the Associate Editor or Editor in Chief. */
    REJECTED: 'rejected',

    /** Suggestion assigned to an Associate Editor for preliminary review. */
    QUEUED: 'queued',

    /** Suggestion is under Associate Editor/Reviewer review. */
    UNDER_REVIEW: 'under-review',

    /** Under final consideration. */
    UNDER_CONSIDERATION: 'under-consideration',

    /** Under Editor-in-Chief review. */
    FINAL_DECISION: 'final-decision',

    /** Suggestion has been accepted for inclusion. */
    ACCEPTED: 'accepted',

    /** Suggestion has been implemented or published. */
    IMPLEMENTED: 'implemented',

    /** Suggestion was . */
    DECLINED: 'declined',

});






/**
 * Private statuses used by Associate Editors.
 * @readonly
 * @enum {string}
 */
export const PrivateStatusAssociateEditor = Object.freeze({
    AWAITING_INITIAL_RESPONSE: 'awaiting-initial-response',
    REVIEWING: 'reviewing',
    REVIEW_ASSIGNED: 'review-assigned',
    FINALIZED: 'finalized',
    APPROVED: 'approved',
    CHANGE_REQUEST: 'change-request',
});

/**
 * Private statuses used by Reviewers.
 * @readonly
 * @enum {string}
 */
export const PrivateStatusReviewer = Object.freeze({
    AWAITING_REVIEWER: 'awaiting-reviewer',
    REVIEW_IN_PROGRESS: 'review-in-progress',
    AWAITING_FEEDBACK: 'awaiting-feedback',
    AWAITING_CHANGE_REQUEST: 'awaiting-change-request',
});


/**
 * Private statuses used by Reviewers.
 * @readonly
 * @enum {string}
 */
export const PrivateEditorInChief = Object.freeze({
    AWAITING_REVIEWER: 'awaiting-reviewer',
    REVIEW_IN_PROGRESS: 'review-in-progress',
    AWAITING_FEEDBACK: 'awaiting-feedback',
    AWAITING_CHANGE_REQUEST: 'awaiting-change-request',
});

/**
 * Grouped Private Statuses
 */
export const PrivateStatus = Object.freeze({
    AssociateEditor: PrivateStatusReviewer,
    Reviewer: PrivateStatusReviewer,
    EditorInChief: PrivateEditorInChief
});













/**
 * System-level internal statuses for workflow tracking.
 * @readonly
 * @enum {string}
 */
export const SystemStatus = Object.freeze({
    NEW: 'new',
    ACTIVE: 'active',
    UNASSIGNED: 'unassigned',
    PENDING: 'pending',
    ELEVATED: 'elevated',
    SUSPENDED: 'suspended',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    AWAITING_FINAL_DECISION: 'awaiting-final-decision',
    ARCHIVED: 'archived',
    DEFERRED: 'deferred',
    ON_HOLD: 'on-hold',
    FLAGGED: 'flagged',
    RESOLVED: 'resolved',
    IN_FINAL_PHASE: 'in-final-phase'
});

/**
 * Grouped export of all statuses.
 */
export const Status = Object.freeze({
    Public: PublicStatus,
    Private: PrivateStatus,
    System: SystemStatus,
});


/**
 * Flat map of all status values across public, private, and system scopes.
 * 
 * @enum {string}
 */
export const AllStatuses = {
    ...PublicStatus,
    ...PrivateStatusAssociateEditor,
    ...PrivateStatusReviewer,
    ...PrivateEditorInChief,
    ...SystemStatus,
};

/**
 * A set of terminal statuses (used to identify completed flows).
 * @type {Set<string>}
 */
export const TerminalStatuses = new Set([
    PublicStatus.ACCEPTED,
    SystemStatus.CLOSED,
    SystemStatus.ARCHIVED,
    SystemStatus.RESOLVED,
]);

/**
 * @param {string} status
 * @returns {boolean} whether the status is considered terminal/final
 */
export function isTerminalStatus(status) {
    return TerminalStatuses.has(status);
}

/**
 * @param {string} status
 * @returns {'Public' | 'Private' | 'System' | null} the group this status belongs to
 */
export function getStatusGroup(status) {
    if (Object.values(PublicStatus).includes(status)) return 'Public';
    if (Object.values(PrivateStatus).includes(status)) return 'Private';
    if (Object.values(SystemStatus).includes(status)) return 'System';
    return null;
}

/**
 * @param {SystemStatus} status
 * @returns {boolean} whether the status is known/valid
 */
export function isValidStatus(status) {
    return Object.values(AllStatuses).includes(status);
}



// export const statusMap = {
//     // === Public ===
//     [Status.Public.SUBMITTED]: 'status--neutral',
//     [Status.Public.REJECTED]: 'status--error',
//     [Status.Public.ASSIGNED]: 'status--info',
//     [Status.Public.UNDER_REVIEW]: 'status--active',
//     [Status.Public.UNDER_CONSIDERATION]: 'status--active',
//     [Status.Public.ACCEPTED]: 'status--success',
//     [Status.Public.PENDING_EXTERNAL_REVIEW]: 'status--external',
//     [Status.Public.UNDER_HIGHER_REVIEW]: 'status--external',

//     // === Private ===
//     [Status.Private.AWAITING_INITIAL_RESPONSE]: 'status--info',
//     [Status.Private.AWAITING_RESPONSE]: 'status--info',
//     [Status.Private.REVIEWING]: 'status--active',
//     [Status.Private.FINALIZED]: 'status--external',
//     [Status.Private.APPROVED]: 'status--success',
//     [Status.Private.CHANGE_REQUEST]: 'status--info',
//     [Status.Private.READY_FOR_DISCUSSION]: 'status--success',
//     [Status.Private.AWAITING_CHANGE_REQUEST]: 'status--active',
//     //   [Status.Private.AWAITING_FEEDBACK]: 'status--info',

//     // === System ===
//     [Status.System.NEW]: 'status--neutral',
//     [Status.System.ACTIVE]: 'status--info',
//     [Status.System.UNASSIGNED]: 'status--neutral',
//     [Status.System.PENDING]: 'status--info',
//     [Status.System.ELEVATED]: 'status--external',
//     [Status.System.SUSPENDED]: 'status--warning',
//     [Status.System.INACTIVE]: 'status--warning',
//     [Status.System.CLOSED]: 'status--success',
//     [Status.System.ARCHIVED]: 'status--neutral',
//     [Status.System.DEFERRED]: 'status--warning',
//     [Status.System.ON_HOLD]: 'status--warning',
//     [Status.System.FLAGGED]: 'status--error',
//     [Status.System.RESOLVED]: 'status--success'
// };


export const SUGGESTION_STATUSES = {
    // Initial / Entry
    NEW: 'new',
    RECEIVED: 'received',
    ACKNOWLEDGED: 'acknowledged',

    // In Progress
    ASSIGNED: 'assigned',
    UNDER_REVIEW: 'under-review',
    IN_DISCUSSION: 'in-discussion',
    REVISIONS_REQUESTED: 'revisions-requested',
    WAITING_FOR_RESPONSE: 'waiting-for-response',
    READY_FOR_DECISION: 'ready-for-decision',

    // Special / Escalated
    UNDER_HIGHER_REVIEW: 'under-higher-review',
    ON_HOLD: 'on-hold',
    DEFERRED: 'deferred',
    NEEDS_CLARIFICATION: 'needs-clarification',

    // Final / Closed
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FINALIZED: 'finalized',
    WITHDRAWN: 'withdrawn',
    CLOSED: 'closed',
    ARCHIVED: 'archived'
};
