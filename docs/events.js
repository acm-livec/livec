import { Status } from './constants/status';

/**
 * Maps key editorial events to their associated status values
 * across system, public, and role-based (AE, EIC, Reviewer) layers.
 *
 * This centralizes status logic to support UIs, logging, and automation.
 */
const Events = Object.freeze({
    /**
     * Suggestion submitted by a community member.
     * Initializes statuses across system and public view.
     */
    SUGGESTION_SUBMITTED_BY_COMMUNITY_MEMBER: {
        System: Status.System.INITIAL_SUBMISSION,
        CommunityMember: Status.Public.SUBMITTED,
    },

    /**
     * Associate Editor is assigned to handle the suggestion.
     */
    ASSOCIATE_EDITOR_ASSIGNED_TO_SUGGESTION: {
        System: Status.System.PRELIMINARY_REVIEW,
        CommunityMember: Status.Public.QUEUED,
        AssociateEditor: Status.Private.AssociateEditor.NEW,
    },

    /**
     * Associate Editor begins internal review of the suggestion.
     */
    ASSOCIATE_EDITOR_STARTED_REVIEW_ON_SUGGESTION: {
        System: Status.System.EDITORIAL_REVIEW,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.REVIEWING,
    },

    /**
     * Associate Editor desk-rejects the suggestion during triage.
     */
    ASSOCIATE_EDITOR_DESK_REJECTED_SUGGESTION: {
        System: Status.System.CLOSED,
        CommunityMember: Status.Public.REJECTED,
        AssociateEditor: Status.Private.AssociateEditor.DESK_REJECTED,
    },

    /**
     * Associate Editor defers the suggestion to a reviewer.
     */
    ASSOCIATE_EDITOR_DEFERRED_SUGGESTION_TO_REVIEWER: {
        System: Status.System.EXTERNAL_REVIEW,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.DEFERRED,
        Reviewer: Status.Private.Reviewer.DEFERRAL,
    },

    /**
     * Reviewer completes review on a deferred suggestion.
     */
    REVIEWER_COMPLETED_DEFERRED_SUGGESTION: {
        System: Status.System.EDITORIAL_REVIEW,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.DEFERRED_COMPLETE,
        Reviewer: Status.Private.Reviewer.REVIEW_COMPLETED,
    },

    /**
     * Associate Editor assigns reviewers for feedback (non-deferred).
     */
    ASSOCIATE_EDITOR_ASSIGNED_REVIEWERS_FOR_FEEDBACK: {
        System: Status.System.TEMPORARILY_PAUSED,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.AWAITING_REVIEWERS,
        Reviewer: Status.Private.Reviewer.FEEDBACK_REQUESTED,
    },

    /**
     * Reviewer submits a recommendation on the suggestion.
     */
    REVIEWER_SUBMITS_RECOMMENDATION: {
        Reviewer: Status.Private.Reviewer.RECOMMENDATION_SUBMITTED,
    },

    /**
     * All reviewers have submitted feedback.
     */
    ALL_REVIEWERS_FINISH_PROVIDING_FEEDBACK: {
        System: Status.System.EDITORIAL_REVIEW,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.ALL_REVIEWS_COMPLETE,
    },

    /**
     * Associate Editor finalizes the suggestion for EIC review (first submission).
     */
    ASSOCIATE_EDITOR_FIRST_FINALIZES_SUGGESTION: {
        System: Status.System.AWAITING_EIC_INPUT,
        AssociateEditor: Status.Private.AssociateEditor.FINALIZED,
        EditorInChief: Status.Private.EditorInChief.NEW_CHANGE,
    },

    /**
     * Editor in Chief accepts AE's finalization and queues for board discussion.
     */
    EDITOR_IN_CHIEF_ACCEPTS_CHANGES: {
        System: Status.System.AWAITING_BOARD_DISCUSSION,
        CommunityMember: Status.Public.UNDER_CONSIDERATION,
        AssociateEditor: Status.Private.AssociateEditor.APPROVED,
        EditorInChief: Status.Private.EditorInChief.READY_FOR_DISCUSSION,
    },

    /**
     * Editor in Chief rejects AE's final recommendation.
     */
    EDITOR_IN_CHIEF_REJECTS_CHANGE: {
        System: Status.System.CLOSED,
        CommunityMember: Status.Public.REJECTED,
        AssociateEditor: Status.Private.AssociateEditor.REJECTED_BY_CHIEF,
        EditorInChief: Status.Private.EditorInChief.REJECTED_FINALIZATION,
    },

    /**
     * Editor in Chief requests revisions from Associate Editor.
     */
    EDITOR_IN_CHIEF_REQUESTS_REVISIONS_FROM_ASSOCIATE_EDITOR: {
        System: Status.System.REFINEMENT_CYCLE,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.REVISIONS_REQUESTED,
        EditorInChief: Status.Private.EditorInChief.AWAITING_REVISIONS,
    },

    /**
     * Associate Editor resubmits finalized suggestion after revision.
     */
    ASSOCIATE_EDITOR_REPEATS_FINALIZE_SUGGESTION: {
        System: Status.System.REFINEMENT_CYCLE,
        CommunityMember: Status.Public.UNDER_REVIEW,
        AssociateEditor: Status.Private.AssociateEditor.FINALIZED,
        EditorInChief: Status.Private.EditorInChief.REVISIONS_RECEIVED,
    },

    /**
     * Editor in Chief initiates board discussion.
     */
    EDITOR_IN_CHIEF_BEGINS_BOARD_DISCUSSION: {
        System: Status.System.IN_BOARD_DISCUSSION,
        CommunityMember: Status.Public.UNDER_DISCUSSION,
        AssociateEditor: Status.Private.AssociateEditor.JOIN_DISCUSSION,
        EditorInChief: Status.Private.EditorInChief.STARTED_DISCUSSION,
    },

    /**
     * Board accepts the suggestion for inclusion.
     */
    BOARD_ACCEPTS_SUGGESTION_CHANGE: {
        System: Status.System.READY_FOR_IMPLEMENTATION,
        CommunityMember: Status.Public.ACCEPTED,
        AssociateEditor: Status.Private.AssociateEditor.COMPLETED,
        EditorInChief: Status.Private.EditorInChief.ACCEPTED_UNANIMOUSLY,
    },

    /**
     * Board rejects the suggestion after discussion.
     */
    BOARD_REJECTS_SUGGESTION_CHANGE: {
        System: Status.System.CLOSED,
        CommunityMember: Status.Public.DECLINED,
        AssociateEditor: Status.Private.AssociateEditor.COMPLETED,
        EditorInChief: Status.Private.EditorInChief.REJECTED_BY_BOARD,
    },

    /**
     * Suggestion is officially published in the curriculum.
     */
    EDITOR_IN_CHIEF_PUBLISHES_CHANGE: {
        System: Status.System.CLOSED,
        CommunityMember: Status.Public.IMPLEMENTED,
        AssociateEditor: Status.Private.AssociateEditor.COMPLETED,
        EditorInChief: Status.Private.EditorInChief.PUBLISHED,
    },
});

export default Events;
