import statusModule from '../../../../docs/shared/constants/status.js';
const { Status, statusMap } = statusModule;

export { Status, statusMap };

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
    REJECTED_BY_EDITOR_IN_CHIEF: 'rejected-by-editor-in-chief',
});

/**
 * @typedef {Object} Disciplines
 * @property {'computer-science'} COMPUTER_SCIENCE - Computer Science.
 * @property {'cybersecurity'} CYBERSECURITY - Cybersecurity.
 * @property {'information-systems'} INFORMATION_SYSTEMS - Information Systems.
 * @property {'computer-engineering'} COMPUTER_ENGINEERING - Computer Engineering.
 * @property {'information-technology'} INFORMATION_TECHNOLOGY - Information Technology.
 * @property {'data-science'} DATA_SCIENCE - Data Science.
 * @property {'computing-curricula'} COMPUTING_CURRICULA - Computing Curricula.
 * @property {'software-engineering'} SOFTWARE_ENGINEERING - Software Engineering.
 */

/**
 * @type {Disciplines}
 */
export const Disciplines = Object.freeze({
    COMPUTER_SCIENCE: 'computer-science',
    CYBERSECURITY: 'cybersecurity',
    INFORMATION_SYSTEMS: 'information-systems',
    COMPUTER_ENGINEERING: 'computer-engineering',

    INFORMATION_TECHNOLOGY: 'information-technology',
    DATA_SCIENCE: 'data-science',
    COMPUTING_CURRICULA: 'computing-curricula',
    SOFTWARE_ENGINEERING: 'software-engineering',
});
