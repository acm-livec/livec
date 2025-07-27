const HTTP_STATUS = require('./http-codes')
const Status = require('./status')


const Roles = Object.freeze({
    COMMUNITY_MEMBER: 'community-member',
    REVIEWER: 'reviewer',
    ASSOCIATE_EDITOR: 'associate-editor',
    EDITOR_IN_CHIEF: 'editor-in-chief',
    ACM_ED_BOARD: 'acm-ed-board'
});



const Actions = Object.freeze({
    DESK_REJECT: 'desk-reject',
    START_REVIEW: 'start-review',
    DEFERED_TO_REVIEWER: 'defered-to-reviewer',
    ASSIGNED_ASSOCIATE_EDITOR: 'assigned-associate-editor',
    ASSIGNED_REVIEWERS: 'assigned-reviewers',
    ADDED_DOCUMENTATION: 'added-documentation',

    RECOMMENDATION_BY_REVIEWER: 'recommendation-by-reviewer',

    SUBMITTED_BY_MEMBER: 'submitted-by-member',
    FINALIZED_BY_ASSOCIATE_EDITOR: 'finalized-by-associate-editor',
    APPROVED_BY_EDITOR_IN_CHIEF: 'approved-by-editor-in-chief',
    CHANGE_REQUEST_BY_EDITOR_IN_CHIEF: 'change-request-by-editor-in-chief',
    REJECTED_BY_EDITOR_IN_CHIEF: 'rejected-by-editor-in-chief',
    STARTED_FINAL_DISCUSSION: 'started-final-discussion',
    ACCEPTED_BY_BOARD: 'accepted-by-board',
    DECLINED_BY_BOARD: 'declined-by-board'
})







module.exports = { Roles, HTTP_STATUS, Status, Actions }


