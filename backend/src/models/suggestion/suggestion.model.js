const { generateSuggestionId } = require('@utils/generate-id');
const { Status, Step, Actions } = require('@utils/constants');
const Documentation = require('../util/documentation.model')
const PublicMessage = require('../util/public-message.model')


class Suggestion {

    constructor(data) {
        this.id = data.id || generateSuggestionId(data.discipline);
        this.title = data.title;
        this.suggestion = data.suggestion || '';

        this.submitter_id = data.submitter_id || data.submitterId;
        this.section_id = data.section_id || data.sectionId;
        this.time_created = data.time_created || data.timeCreated || new Date().toISOString();

        this.status = data.status || {
            for_member: Status.Public.SUBMITTED,
            for_associate_editor: '',
            for_editor_in_chief: '',
            system: Status.System.UNASSIGNED
        };

        this.discipline = data.discipline;

        this.assigned_associate_editor = data.assigned_associate_editor || data.assignedAssociateEditor;
        this.assigned_editor_in_chief = data.assigned_editor_in_chief || data.assignedEditorInChief;
        this.assigned_reviewers = data.assigned_reviewers || data.assignedReviewers || [];

        this.meta = data.meta || {};

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





    toCommunityMember() {
        return {
            id: this.id,
            title: this.title,
            suggestion: this.suggestion,
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
            suggestion: this.suggestion,
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
            system: {
                status: this.status.system
            }
        }
    }



    toEditorInCheif() {
        return {
            id: this.id,
            title: this.title,
            suggestion: this.suggestion,
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
            system: {
                status: this.status.system
            }
        }
    }




    addMeta(meta) {
        Object.assign(this.meta, meta);
    }







    _updateStatus(event) {

        switch (event) {

            case (Actions.ASSIGNED_ASSOCIATE_EDITOR): this.status = {
                'for_member': Status.Public.ASSIGNED,
                'for_associate_editor': Status.Private.AWAITING_INITIAL_RESPONSE,
                'system': Status.System.NEW
            };
                break;

            case (Actions.DESK_REJECT): this.status = {
                'for_member': Status.Public.REJECTED,
                'for_associate_editor': Status.Private.REJECTED,
                'system': Status.System.CLOSED
            };
                break;
            case (Actions.REJECTED_BY_EDITOR_IN_CHIEF): this.status = {
                'for_member': Status.Public.REJECTED,
                'for_associate_editor': Status.Private.REJECTED,
                'system': Status.System.CLOSED
            };
                break;

            case Actions.START_REVIEW: this.status = {
                'for_member': Status.Public.UNDER_REVIEW,
                'for_associate_editor': Status.Private.REVIEWING,
                'system': Status.System.ACTIVE
            };
                break;

            case Actions.FINALIZED_BY_ASSOCIATE_EDITOR: this.status = {
                'for_member': Status.Public.UNDER_HIGHER_REVIEW,
                'for_associate_editor': Status.Private.FINALIZED,
                'for_editor_in_chief': Status.Private.AWAITING_RESPONSE,
                'system': Status.System.ELEVATED
            }

                break;

            case Actions.APPROVED_BY_EDITOR_IN_CHIEF: this.status = {
                'for_member': Status.Public.UNDER_CONSIDERATION,
                'for_associate_editor': Status.Private.APPROVED,
                'for_editor_in_chief': Status.Private.READY_FOR_DISCUSSION,
                'system': Status.System.AWAITING_FINAL_DECISION
            }

                break

            case Actions.CHANGE_REQUEST_BY_EDITOR_IN_CHIEF: this.status = {
                'for_member': Status.Public.UNDER_CONSIDERATION,
                'for_associate_editor': Status.Private.CHANGE_REQUEST,
                'for_editor_in_chief': Status.Private.AWAITING_CHANGE_REQUEST,
                'system': Status.System.ACTIVE
            }
        }
    }








    insertDocumentation(action, author, text) {
        this.documentation.push(new Documentation({ action, author, text }).toObject())
    }




    insertHistory(action, performedBy = 'LiveC') {
        this.history.push({
            action: action,
            performed_by: performedBy,
            date: new Date().toISOString()
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
        if (this.status.system === Status.System.CLOSED) return

        this._updateStatus(Actions.FINALIZED_BY_ASSOCIATE_EDITOR)

        this.insertHistory(Actions.FINALIZED_BY_ASSOCIATE_EDITOR, ae)

        this.revised_section = updatedSection;

        this.insertPublicMessage("Your suggestion is now under review by the Editor In Chief")

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




    assignReviewers(notes, message, newReviewers) {
        newReviewers.map(id => (
            !this.assigned_reviewers.includes(id) && this.assigned_reviewers.push(id)
        ));

        this.addMeta({
            initial_notes: notes,
            public_message: message,
            time_started: new Date().toISOString(),
        });

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
}




module.exports = Suggestion