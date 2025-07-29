/**
 * @fileOverview actions 'Defines user roles and associated action enums used across the editorial workflow.'
 * @module constants
 * @jramir7254

 * @description This file declares enums for various roles (Associate Editor, Reviewer, etc.)
 * and merges them into a single `AllActions` object for easy reference.
 */



/**
 * Enum representing Associate Editor actions.
 * 
 * @readonly
 * @enum {string}
 */
export const AssociateEditorActions = Object.freeze({
    /** Reject the submission without sending it for review. */
    DESK_REJECT: 'desk-reject',

    /** Begin the editorial review process. */
    START_REVIEW: 'start-review',

    /** Hand off to a reviewer for feedback. */
    DEFER_TO_REVIEWER: 'defer-to-reviewer',

    /** Assign reviewer(s) to the submission. */
    ASSIGN_REVIEWERS: 'assign-reviewers',

    /** Add internal documentation or notes. */
    ADD_DOCUMENTATION: 'add-documentation',


    FINALIZE: 'finalize'
});


/**
 * Enum representing Editor In Chief actions.
 * @readonly
 */
export const EditorInChiefActions = Object.freeze({
    /** Approve the proposed content changes. */
    APPROVE_CHANGE: 'approve-change',

    /** Request changes to the proposed content. */
    SEND_CHANGE_REQUEST: 'send-change-request',


    /** Reject the proposed content entirely.  
     *  @note Reject functionality for Editor In Chief is not mentioned in (SRS).
     */
    REJECT_CHANGE: 'reject-change',
});


/**
 * Enum representing Reviewer actions.
 * @readonly
 */
export const ReviewerActions = Object.freeze({
    /** Submit a completed review for the assigned content. */
    SUBMIT_REVIEW: 'submit-review',

    /** Request revisions before approving the content. */
    REQUEST_REVISION: 'request-revision',

    /** Approve the content without further changes. */
    APPROVE_CONTENT: 'approve-content',
});


/**
 * Enum representing Member actions (e.g., suggestion submitter).
 * @readonly
 */
export const MemberActions = Object.freeze({
    /** Submit a new suggestion or content proposal. */
    SUBMIT_SUGGESTION: 'submit-suggestion',

    /** Revise a previously submitted suggestion. */
    REVISE_SUGGESTION: 'revise-suggestion',

    /** Withdraw a suggestion before it is reviewed. */
    WITHDRAW_SUGGESTION: 'withdraw-suggestion',
});


/**
 * Combined Enum of all possible actions from all roles.
 * @readonly
 */
export const Actions = Object.freeze({
    ...EditorInChiefActions,
    ...ReviewerActions,
    ...MemberActions,
    ...AssociateEditorActions,
});

