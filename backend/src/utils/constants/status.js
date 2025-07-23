/**
 * Represents the public status for suggestions visible to submitters.
 *
 * Used to show user-facing status labels and icons.
 * 
 * @typedef {Object} Public
 * @property {'submitted'} SUBMITTED - Suggestion has been submitted.
 * @property {'rejected'} REJECTED - Suggestion has been rejected.
 * @property {'assigned'} ASSIGNED - Suggestion has been assigned.
 * @property {'under-review'} UNDER_REVIEW - Suggestion is under review.
 * @property {'under-higher-review'} UNDER_HIGHER_REVIEW - Suggestion is under review.
 * @property {'under-consideration'} UNDER_CONSIDERATION - Suggestion is under consideration.
 * @property {'accepted'} ACCEPTED - Suggestion has been accepted.
 * @property {'pending-external-review'} PENDING_EXTERNAL_REVIEW - Suggestion has been accepted.
 */

/**
 * @typedef {Object} Private
 * @property {'awaiting-initial-response'} AWAITING_INITIAL_RESPONSE - Waiting for submitter.
 * @property {'rejected'} REJECTED - Suggestion has been rejected.
 * @property {'reviewing'} REVIEWING - Being reviewed internally.
 * @property {'finalized'} FINALIZED - Being reviewed internally.
 * @property {'awaiting-reviewer'} AWAITING_REVIEWER - Waiting for external reviewer.
 */

/**
 * @typedef {Object} System
 * @property {'new'} NEW - New in system.
 * @property {'closed'} CLOSED - Closed in system.
 * @property {'active'} ACTIVE - Currently active.
 * @property {'unassigned'} UNASSIGNED - Not yet assigned.
 * @property {'pending'} PENDING - Pending action.
 * @property {'elevated'} ELEVATED - Escalated to higher priority.
 * @property {'suspended'} SUSPENDED - Suspended.
 * @property {'inactive'} INACTIVE - Not currently active.
 * @property {'archived'} ARCHIVED - Archived for records.
 * @property {'deferred'} DEFERRED - Deferred for later.
 * @property {'on-hold'} ON_HOLD - Deferred for later.
 * @property {'flagged'} FLAGGED - Deferred for later.
 * @property {'resolved'} RESOLVED - Deferred for later.
 */

/**
 * @typedef {Object} Status
 * @property {Public} Public - Public-facing statuses.
 * @property {Private} Private - Private/reviewer statuses.
 * @property {System} System - System-level internal statuses.
 */


/**
 * Frozen constant for all possible statuses.
 * @type {Status}
 */
const Status = Object.freeze({
    Public: {
        SUBMITTED: 'submitted',
        REJECTED: 'rejected',
        ASSIGNED: 'assigned',
        UNDER_REVIEW: 'under-review',
        UNDER_HIGHER_REVIEW: 'under-higher-review',
        UNDER_CONSIDERATION: 'under-consideration',
        ACCEPTED: 'accepted',
        IMPLEMENTED: 'implemented',
        PENDING_EXTERNAL_REVIEW: 'pending-external-review'
    },

    Private: {
        AWAITING_INITIAL_RESPONSE: 'awaiting-initial-response',
        AWAITING_RESPONSE: 'awaiting-response',
        REVIEWING: 'reviewing',
        REJECTED: 'rejected',
        AWAITING_REVIEWER: 'awaiting-reviewer',
        UNDER_REVIEW: 'under-review',
        FINALIZED: 'finalized',
        APPROVED: 'approved',
        RECOMMENDATION_SUBMITTED: 'recommendation-submitted',
        REVIEW_ASSIGNED: 'review-assigned',
        REVIEW_IN_PROGRESS: 'review-in-progress',
        AWAITING_FEEDBACK: 'awaiting-feedback',
        AWAITING_CHANGE_REQUEST: 'awaiting-change-request',
        CHANGE_REQUEST: 'change-request',
        READY_FOR_DISCUSSION: 'ready-for-discussion'
    },

    System: {
        NEW: 'new',
        ACTIVE: 'active',
        UNASSIGNED: 'unassigned',
        PENDING: 'pending',
        ELEVATED: 'elevated',
        SUSPENDED: 'suspended',
        INACTIVE: 'inactive',
        CLOSED: 'closed',
        ARCHIVED: 'archived',
        AWAITING_FINAL_DECISION: 'awaiting-final-decision',
        DEFERRED: 'deferred',
        ON_HOLD: 'on-hold',
        FLAGGED: 'flagged',
        RESOLVED: 'resolved'
    }
})

module.exports = Status