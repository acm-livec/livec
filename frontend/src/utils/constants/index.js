import { Status, statusMap } from './status'

export {Status, statusMap}

export const Roles = Object.freeze({
    COMMUNITY_MEMBER: 'community-member',
    REVIEWER: 'reviewer',
    ASSOCIATE_EDITOR: 'associate-editor',
    EDITOR_IN_CHIEF: 'editor-in-chief',
    ACM_ED_BOARD: 'acm-ed-board'
});





export const Triage = Object.freeze({
    DESK_REJECT: 'desk-reject',
    START_REVIEW: 'start-review',
    DEFER_TO_REVIEWER: 'defer-to-reviewer'
})


export const Actions = Object.freeze({
    DESK_REJECT: 'desk-reject',
    START_REVIEW: 'start-review',
    DEFER_TO_REVIEWER: 'defer-to-reviewer',
    ASSIGNED_ASSOCIATE_EDITOR: 'assigned-associate-editor',
    ASSIGNED_REVIEWERS: 'assigned-reviewers',
    ADDED_DOCUMENTATION: 'added-documentation',

    SUBMITTED_BY_MEMBER: 'submitted-by-member',
    FINALIZED_BY_ASSOCIATE_EDITOR: 'finalized-by-associate-editor',
    APPROVED_BY_EDITOR_IN_CHIEF: 'approved-by-editor-in-chief',
    CHANGE_REQUEST_BY_EDITOR_IN_CHIEF: 'change-request-by-editor-in-chief',
    REJECTED_BY_EDITOR_IN_CHIEF: 'rejected-by-editor-in-chief'
})







export const Disciplines = Object.freeze({
    COMPUTER_SCIENCE: 'computer-science',
    CYBERSECURITY: 'cybersecurity',
    INFORMATION_SYSTEMS: 'information-systems',
    COMPUTER_ENGINEERING: 'computer-engineering',

    INFORMATION_TECHNOLOGY: 'information-technology',
    DATA_SCIENCE: 'data-science',
    COMPUTING_CURRICULA: 'computing-curricula',
    SOFTWARE_ENGINEERING: 'software-engineering'
})












