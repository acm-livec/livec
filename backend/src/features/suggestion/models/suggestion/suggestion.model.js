const { generateSuggestionId } = require('@shared/utils/generate-id');
const { Actions } = require('@shared/constants');
const { Status } = require('@docs/constants/status.js');
const { Events } = require('@docs/events.js');
const Documentation = require('../util/documentation.model')
const PublicMessage = require('../util/public-message.model')


class Suggestion {

    constructor(data) {
        this.id = data.id || generateSuggestionId(data.discipline);
        this.title = data.title;
        this.text = data.text || '';
        this.suggestion = data.text || '';

        this.submitter_id = data.submitter_id || data.submitterId;
        this.section_id = data.section_id || data.sectionId;
        this.time_created = data.time_created || data.timeCreated || new Date().toISOString();

        this.status = data.status || {
            for_member: Status.Public.SUBMITTED,
            for_associate_editor: '',
            for_editor_in_chief: '',
            system: Status.System.INITIAL_SUBMISSION,
        };

        this.discipline = data.discipline;

        this.assigned_associate_editor = data.assigned_associate_editor || data.assignedAssociateEditor;
        this.assigned_editor_in_chief = data.assigned_editor_in_chief || data.assignedEditorInChief;
        this.assigned_reviewers = data.assigned_reviewers || data.assignedReviewers || [];

        this.meta = data.meta || {};
        this.final_decisions = data.final_decisions || []

        this.revised_section = data.revised_section || "";

        this.public_updates = data.public_updates || [new PublicMessage({
            status: Status.Public.SUBMITTED,
            message: 'Your suggestion has been submitted and we are finding an associate editor to review'
        })]

        this.documentation = data.documentation || []

        this.history = data.history || [{
            action: Actions.SUBMITTED_BY_MEMBER,
            performed_by: data.submitterId,
            date: new Date().toISOString()
        }]
    }

    toPublic() {
        return {
            title: this.title,
            text: this.text,
            timeCreated: this.time_created,
        }
    }




    toCommunityMember() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            sectionId: this.section_id,
            timeCreated: this.time_created,
            status: this.status.for_member,
            discipline: this.discipline,
            publicUpdates: this.public_updates,
        }
    }



    toAssociateEditor() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            timeCreated: this.time_created,
            status: this.status.for_associate_editor,
            sectionId: this.section_id,
            discipline: this.discipline,
            submitterId: this.submitter_id,
            meta: this.meta,
            assignedAssociateEditor: this.assigned_associate_editor,
            assignedEditorInChief: this.assigned_editor_in_chief || 'none',
            assignedReviewers: this.assigned_reviewers || [],
            documentation: this.documentation,
            revisedSection: this.revised_section,
            history: this.history,
            finalDecisions: this.final_decisions,
            system: {
                status: this.status.system
            }
        }
    }
    toReviewer() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            timeCreated: this.time_created,
            status: this.status.for_reviewer,
            sectionId: this.section_id,
            discipline: this.discipline,
            submitterId: this.submitter_id,
            meta: this.meta,
            assignedAssociateEditor: this.assigned_associate_editor,
            assignedEditorInChief: this.assigned_editor_in_chief || 'none',
            documentation: this.documentation,
            history: this.history,
            system: {
                status: this.status.system
            }
        }
    }



    toEditorInCheif() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            timeCreated: this.time_created,
            status: this.status.for_editor_in_chief,
            sectionId: this.section_id,
            discipline: this.discipline,
            submitterId: this.submitter_id,
            meta: this.meta,
            assignedAssociateEditor: this.assigned_associate_editor,
            assignedEditorInChief: this.assigned_editor_in_chief || 'none',
            assignedReviewers: this.assigned_reviewers || [],
            documentation: this.documentation,
            revisedSection: this.revised_section,
            finalDecisions: this.final_decisions,
            history: this.history,

            system: {
                status: this.status.system
            }
        }
    }




    addMeta(meta) {
        Object.assign(this.meta, meta);
    }







    _updateStatus(action) {
        const ActionEvents = {
            [Actions.ASSIGNED_ASSOCIATE_EDITOR]: 'ASSOCIATE_EDITOR_ASSIGNED_TO_SUGGESTION',
            [Actions.DESK_REJECT]: 'ASSOCIATE_EDITOR_DESK_REJECTED_SUGGESTION',
            [Actions.REJECTED_BY_EDITOR_IN_CHIEF]: 'EDITOR_IN_CHIEF_REJECTS_CHANGE',
            [Actions.START_REVIEW]: 'ASSOCIATE_EDITOR_STARTED_REVIEW_ON_SUGGESTION',
            [Actions.FINALIZED_BY_ASSOCIATE_EDITOR]: 'ASSOCIATE_EDITOR_FIRST_FINALIZES_SUGGESTION',
            [Actions.APPROVED_BY_EDITOR_IN_CHIEF]: 'EDITOR_IN_CHIEF_ACCEPTS_CHANGES',
            [Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF]: 'EDITOR_IN_CHIEF_REQUESTS_REVISIONS_FROM_ASSOCIATE_EDITOR',
            [Actions.DEFERED_TO_REVIEWER]: 'ASSOCIATE_EDITOR_DEFERRED_SUGGESTION_TO_REVIEWER',
            [Actions.ASSIGNED_REVIEWERS]: 'ASSOCIATE_EDITOR_ASSIGNED_REVIEWERS_FOR_FEEDBACK',
            [Actions.RECOMMENDATION_BY_REVIEWER]: 'REVIEWER_SUBMITS_RECOMMENDATION',
            [Actions.STARTED_FINAL_DISCUSSION]: 'EDITOR_IN_CHIEF_BEGINS_BOARD_DISCUSSION',
            [Actions.ACCEPTED_BY_BOARD]: 'BOARD_ACCEPTS_SUGGESTION_CHANGE',
            [Actions.DECLINED_BY_BOARD]: 'BOARD_REJECTS_SUGGESTION_CHANGE',
        };

        const eventKey = ActionEvents[action] || action;
        const mapping = Events[eventKey];
        if (!mapping) return;
        if (mapping.System) this.status.system = mapping.System;
        if (mapping.CommunityMember) this.status.for_member = mapping.CommunityMember;
        if (mapping.AssociateEditor) this.status.for_associate_editor = mapping.AssociateEditor;
        if (mapping.EditorInChief) this.status.for_editor_in_chief = mapping.EditorInChief;
        if (mapping.Reviewer) this.status.for_reviewer = mapping.Reviewer;
    }




    isInDeliberation() {
        return this.status.system === Status.System.REFINEMENT_CYCLE ||
            this.status.system === Status.System.AWAITING_BOARD_DISCUSSION ||
            this.status.system === Status.System.IN_BOARD_DISCUSSION ||
            this.status.system === Status.System.READY_FOR_IMPLEMENTATION ||
            this.status.system === Status.System.AWAITING_EIC_INPUT
    }




    insertDocumentation(action, author, content) {
        this.documentation.push(new Documentation({ action, author, content }).toObject())
    }




    insertHistory(action, performedBy = 'LiveC', meta = {}) {
        this.history.push({
            action: action,
            performed_by: performedBy,
            date: new Date().toISOString(),
            meta
        })
    }



    insertPublicMessage(message, author) {
        this.public_updates.push(new PublicMessage({
            status: this.status.for_member,
            author: author,
            message: message
        }).toObject())
    }


    associateEditorFinalized(ae, updatedSection) {
        if (this.status.system === Status.System.CLOSED) return;

        const event =
            this.status.system === Status.System.REFINEMENT_CYCLE
                ? 'ASSOCIATE_EDITOR_REPEATS_FINALIZE_SUGGESTION'
                : Actions.FINALIZED_BY_ASSOCIATE_EDITOR;

        this._updateStatus(event);

        this.insertHistory(Actions.FINALIZED_BY_ASSOCIATE_EDITOR, ae);

        this.revised_section = updatedSection;

        this.insertPublicMessage(
            "Your suggestion is now under review by the Editor In Chief"
        );
    }




    reject(rejecterId, reason, message) {
        if (this.status.system === Status.System.CLOSED) return

        const action = rejecterId.startsWith("AE") ? Actions.DESK_REJECT : Actions.REJECTED_BY_EDITOR_IN_CHIEF

        if (!action) throw Error("NO action")

        console.log(action)

        this._updateStatus(action)

        this.insertHistory(action, rejecterId)

        this.insertDocumentation(action, rejecterId, reason)

        this.insertPublicMessage(message, rejecterId)



        return "###-####";
    }



    startReview(startedBy, notes, message) {
        if (this.status.system === Status.System.CLOSED) return;

        this._updateStatus(Actions.START_REVIEW);

        this.insertHistory(Actions.START_REVIEW, startedBy)

        this.insertDocumentation(Actions.START_REVIEW, startedBy, notes)

        this.insertPublicMessage(message, startedBy)

        return "###-####";
    }

    defer(notes, message, reviewerId) {
        this.assigned_reviewers.push({ id: reviewerId, recommendation: 'pending' })
        this._updateStatus(Actions.DEFERED_TO_REVIEWER)

        this.insertHistory(Actions.DEFERED_TO_REVIEWER, this.assigned_associate_editor)
        this.insertDocumentation(Actions.DEFERED_TO_REVIEWER, this.assigned_associate_editor, notes)
        this.insertPublicMessage(message, this.assigned_associate_editor)
    }


    updateReviewer(id, decision) {
        const r = this.assigned_reviewers.find(rev => rev.id === id)
        r.recommendation = decision
    }


    addRecommendation(reviewerId, decision) {
        this._updateStatus(Actions.RECOMMENDATION_BY_REVIEWER)
        this.insertHistory(Actions.RECOMMENDATION_BY_REVIEWER, reviewerId, { decision })
        this.updateReviewer(reviewerId, decision)
    }

    assignAssociateEditor(associateEditor) {
        this.assigned_associate_editor = associateEditor.id;
        this.assigned_editor_in_chief = associateEditor.assignedEditorInChief;

        this._updateStatus(Actions.ASSIGNED_ASSOCIATE_EDITOR);

        this.insertHistory(Actions.ASSIGNED_ASSOCIATE_EDITOR)

        this.insertPublicMessage("Your suggestion has been assigned to an associate editor for preliminary review.")

    }


    approve(eic, notes, message) {
        if (this.status.system === Status.System.CLOSED) return;


        this._updateStatus(Actions.APPROVED_BY_EDITOR_IN_CHIEF);

        this.insertHistory(Actions.APPROVED_BY_EDITOR_IN_CHIEF, eic)

        this.insertDocumentation(Actions.APPROVED_BY_EDITOR_IN_CHIEF, eic, notes)

        this.insertPublicMessage(message, eic)

        return "###-####";

    }




    assignReviewers(newReviewers) {
        newReviewers.map(id => (
            !this.assigned_reviewers.includes(id) && this.assigned_reviewers.push({ id, recommendation: 'pending' })
        ));

        this.insertHistory(Actions.ASSIGNED_REVIEWERS, this.assigned_associate_editor, { numAssigned: newReviewers.length })


        this._updateStatus(Actions.ASSIGNED_REVIEWERS);
    }


    insertChangeRequest(eic, change) {
        if (this.status.system === Status.System.CLOSED) return;


        this._updateStatus(Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF);

        this.insertHistory(Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF, eic)

        this.insertDocumentation(Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF, eic, change)

        // this.insertPublicMessage(message, eic )

        return "###-####";

    }


    startDiscussion(eic) {
        if (this.status.system === Status.System.CLOSED) return;
        this._updateStatus(Actions.STARTED_FINAL_DISCUSSION);
        this.insertHistory(Actions.STARTED_FINAL_DISCUSSION, eic)
        this.insertPublicMessage("Your suggestion is currently now under discussion by the Editorial Board for a final decision!")

    }

    addBoard(board) {
        const decisions = board.map(item => ({
            board_member_id: item,
            final_decision: 'pending'
        }))
        this.final_decisions = decisions
    }

    didVote(userId) {
        const decision = this.final_decisions.find(
            (entry) => entry.board_member_id === userId
        );

        return decision.final_decision !== 'pending'
    }


    updateVote(userId, newDecision, notes) {
        const decision = this.final_decisions.find(
            (entry) => entry.board_member_id === userId
        );

        if (decision) {
            decision.final_decision = newDecision;
            this.insertDocumentation("vote-casted", userId, notes)
            return { updated: true, message: 'Vote updated' };
        } else {
            return { updated: false, message: 'User not found' };
        }
    }

    finalizeIfComplete() {
        const votes = this.final_decisions.map(d => d.final_decision);
        if (votes.includes('pending')) return null;

        if (votes.includes('exclude')) {
            this._updateStatus(Actions.DECLINED_BY_BOARD);
            this.insertHistory(Actions.DECLINED_BY_BOARD, 'LiveC');
            return 'declined';
        }

        this._updateStatus(Actions.ACCEPTED_BY_BOARD);
        this.insertHistory(Actions.ACCEPTED_BY_BOARD, 'LiveC');
        return 'accepted';
    }

    finalizeImplementation(eic, notes = '', message = '') {
        this.insertDocumentation(Actions.ACCEPTED_BY_BOARD, eic, notes);
        this.insertPublicMessage(message, eic);
    }
}




module.exports = Suggestion