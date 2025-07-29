/**
 * Public statuses visible to suggestion submitters.
 * Represents high-level stages of the submission lifecycle.
 * @readonly
 * @enum {string}
 */
export const PublicStatus = Object.freeze({
    /** Suggestion has been successfully submitted. */
    SUBMITTED: 'submitted',

    /** Suggestion has been placed in the review queue. */
    QUEUED: 'queued',

    /** Suggestion is currently under editorial or reviewer evaluation. */
    UNDER_REVIEW: 'under-review',

    /** Suggestion is under consideration by the Editor in Chief. */
    UNDER_CONSIDERATION: 'under-consideration',

    /** Suggestion is being discussed by the editorial board. */
    UNDER_DISCUSSION: 'under-discussion',

    /** Suggestion has been accepted for inclusion. */
    ACCEPTED: 'accepted',

    /** Suggestion has been implemented or published. */
    IMPLEMENTED: 'implemented',

    /** Suggestion was declined after final board discussion. */
    DECLINED: 'declined',

    /** Suggestion was rejected by the Associate Editor or Editor in Chief. */
    REJECTED: 'rejected',
});






/**
 * Internal statuses used by Associate Editors.
 * Reflects detailed steps of triage, review, and handoff processes.
 * @readonly
 * @enum {string}
 */
export const PrivateStatusAssociateEditor = Object.freeze({
    /** Suggestion is in the Associate Editor's new queue. */
    NEW: 'new',

    /** Associate Editor desk rejected the suggestion. */
    DESK_REJECTED: 'desk-rejected',

    /** Associate Editor is actively reviewing the suggestion. */
    REVIEWING: 'reviewing',

    /** Suggestion was deferred to an external reviewer. */
    DEFERRED: 'deferred',

    /** Deferred review has been completed. */
    DEFERRED_COMPLETE: 'deferred-complete',

    /** Associate Editor is awaiting reviewer assignments (non-deferred). */
    AWAITING_REVIEWERS: 'awaiting-reviewers',

    /** All assigned reviewers have submitted their recommendations. */
    ALL_REVIEWS_COMPLETE: 'all-reviews-complete',

    /** Suggestion has been finalized by the Associate Editor and sent to EIC. */
    FINALIZED: 'finalized',

    /** Suggestion was rejected by the Editor in Chief. */
    REJECTED_BY_CHIEF: 'rejected-by-chief',

    /** Suggestion was approved by the Editor in Chief. */
    APPROVED: 'approved',

    /** Suggestion has entered editorial board discussion. */
    JOIN_DISCUSSION: 'join-discussion',

    /** EIC has requested revisions on the suggestion. */
    REVISIONS_REQUESTED: 'revisions-requested',

    /** Editorial board decision complete — final outcome recorded */
    COMPLETED: 'completed',
});



/**
 * Internal statuses used by Reviewers.
 * Tracks progress of deferred or invited reviewer contributions.
 * @readonly
 * @enum {string}
 */
export const PrivateStatusReviewer = Object.freeze({
    /** Suggestion was deferred to the reviewer for evaluation. */
    DEFERRAL: 'deferral',

    /** Reviewer completed their review of the suggestion. */
    REVIEW_COMPLETED: 'review-completed',

    /** Reviewer was requested to provide feedback by the AE. */
    FEEDBACK_REQUESTED: 'feedback-requested',

    /** Reviewer submitted their recommendation. */
    RECOMMENDATION_SUBMITTED: 'recommendation-submitted',
});



/**
 * Internal statuses used by Editors in Chief.
 * Reflects EIC-specific stages including board coordination and final decisions.
 * @readonly
 * @enum {string}
 */
export const PrivateEditorInChief = Object.freeze({
    /** Finalized suggestion received from Associate Editor. */
    NEW_CHANGE: 'new-change',

    /** Finalized changes rejected by the Editor in Chief */
    REJECTED_FINALIZATION: 'rejected-finalization',

    /** Suggestion approved and ready to enter board discussion. */
    READY_FOR_DISCUSSION: 'ready-for-discussion',

    /** EIC is awaiting revisions or follow-up from the Associate Editor. */
    AWAITING_REVISIONS: 'awaiting-revisions',

    /** Revisions received from Associate Editor — pending EIC review */
    REVISIONS_RECEIVED: 'revisions-received',

    /** EIC has initiated discussion among editorial board members. */
    STARTED_DISCUSSION: 'started-discussion',

    /** Suggestion was accepted unanimously by all board members. */
    ACCEPTED_UNANIMOUSLY: 'accepted-unanimously',

    /** Suggestion was published in the official curriculum. */
    PUBLISHED: 'published',

    /** One or more board members voted to reject the suggestion. */
    REJECTED_BY_BOARD: 'rejected-by-board',
});

/**
 * Grouped Private Statuses
 */
export const PrivateStatus = Object.freeze({
    AssociateEditor: PrivateStatusAssociateEditor,
    Reviewer: PrivateStatusReviewer,
    EditorInChief: PrivateEditorInChief
});




/**
 * System-level internal statuses for workflow tracking.
 * @readonly
 * @enum {string}
 */
export const SystemStatus = Object.freeze({
    /** Initial intake: Suggestion submitted by Community Member */
    INITIAL_SUBMISSION: 'initial-submission',

    /** No Associate Editor has been assigned yet */
    PENDING_ASSIGNMENT: 'pending-assignment',

    /** Initial review by Associate Editor (triage: reject, defer, review) */
    PRELIMINARY_REVIEW: 'preliminary-review',

    /** In-depth internal AE review or follow-up after revisions */
    EDITORIAL_REVIEW: 'editorial-review',

    /** Deferred to external reviewers */
    EXTERNAL_REVIEW: 'external-review',

    /** Iterative back-and-forth between Associate Editor and EIC */
    REFINEMENT_CYCLE: 'refinement-cycle',

    /** Awaiting editorial input or wording changes from EIC */
    AWAITING_EIC_INPUT: 'awaiting-eic-input',

    /** Accepted by EIC — awaiting editorial board discussion */
    AWAITING_BOARD_DISCUSSION: 'awaiting-board-discussion',

    /** Being discussed/voted on by the editorial board */
    IN_BOARD_DISCUSSION: 'in-board-discussion',

    /** Accepted and awaiting implementation */
    READY_FOR_IMPLEMENTATION: 'ready-for-implementation',

    /** Paused due to reviewer availability, missing input, or manual hold */
    TEMPORARILY_PAUSED: 'temporarily-paused',

    /** Fully closed (declined, rejected, or implemented) */
    CLOSED: 'closed',

    /** Archived for record-keeping after completion */
    ARCHIVED: 'archived',
});



/**
 * Grouped export of all statuses.
 */
export const Status = Object.freeze({
    Public: PublicStatus,
    Private: PrivateStatus,
    System: SystemStatus,
});




