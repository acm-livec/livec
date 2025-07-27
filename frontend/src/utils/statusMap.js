import { Status } from '@docs/constants/status.js';

/**
 * Maps status values to CSS class names used by status badges.
 * Includes all public and private statuses defined in `docs/constants/status.js`.
 * System statuses are intentionally excluded.
 */
export const statusMap = {
    // --- Public Statuses ---
    [Status.Public.SUBMITTED]: 'status--neutral',
    [Status.Public.QUEUED]: 'status--info',
    [Status.Public.UNDER_REVIEW]: 'status--active',
    [Status.Public.UNDER_CONSIDERATION]: 'status--active',
    [Status.Public.UNDER_DISCUSSION]: 'status--external',
    [Status.Public.ACCEPTED]: 'status--success',
    [Status.Public.IMPLEMENTED]: 'status--success',
    [Status.Public.DECLINED]: 'status--error',
    [Status.Public.REJECTED]: 'status--error',

    // --- Private Statuses: Associate Editor ---
    [Status.Private.AssociateEditor.NEW]: 'status--neutral',
    [Status.Private.AssociateEditor.DESK_REJECTED]: 'status--error',
    [Status.Private.AssociateEditor.REVIEWING]: 'status--active',
    [Status.Private.AssociateEditor.DEFERRED]: 'status--external',
    [Status.Private.AssociateEditor.DEFERRED_COMPLETE]: 'status--info',
    [Status.Private.AssociateEditor.AWAITING_REVIEWERS]: 'status--info',
    [Status.Private.AssociateEditor.ALL_REVIEWS_COMPLETE]: 'status--info',
    [Status.Private.AssociateEditor.FINALIZED]: 'status--external',
    [Status.Private.AssociateEditor.REJECTED_BY_CHIEF]: 'status--error',
    [Status.Private.AssociateEditor.APPROVED]: 'status--success',
    [Status.Private.AssociateEditor.JOIN_DISCUSSION]: 'status--active',
    [Status.Private.AssociateEditor.REVISIONS_REQUESTED]: 'status--info',
    [Status.Private.AssociateEditor.COMPLETED]: 'status--success',

    // --- Private Statuses: Reviewer ---
    [Status.Private.Reviewer.DEFERRAL]: 'status--external',
    [Status.Private.Reviewer.REVIEW_COMPLETED]: 'status--success',
    [Status.Private.Reviewer.FEEDBACK_REQUESTED]: 'status--info',
    [Status.Private.Reviewer.RECOMMENDATION_SUBMITTED]: 'status--success',

    // --- Private Statuses: Editor in Chief ---
    [Status.Private.EditorInChief.NEW_CHANGE]: 'status--neutral',
    [Status.Private.EditorInChief.REJECTED_FINALIZATION]: 'status--error',
    [Status.Private.EditorInChief.READY_FOR_DISCUSSION]: 'status--success',
    [Status.Private.EditorInChief.AWAITING_REVISIONS]: 'status--info',
    [Status.Private.EditorInChief.REVISIONS_RECEIVED]: 'status--info',
    [Status.Private.EditorInChief.STARTED_DISCUSSION]: 'status--active',
    [Status.Private.EditorInChief.ACCEPTED_UNANIMOUSLY]: 'status--success',
    [Status.Private.EditorInChief.PUBLISHED]: 'status--success',
    [Status.Private.EditorInChief.REJECTED_BY_BOARD]: 'status--error',
};
