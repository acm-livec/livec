
import User from "../user.model.js";


class AssociateEditor extends User {
    static roleKey = 'associateEditors';

    constructor(data) {
        super(data);
        this.discipline = data.discipline || 'none';
        this.assignedEditorInChief = data.assignedEditorInChief || 'none'
        this.assignedReviewers = data.assignedReviewers || []
        this.assignedSuggestions = data.assignedSuggestions || [];
    }

    static async findById(id) {
        return this._findOneById(this.roleKey, id);
    }

    notifyDiscussion(s) {
        if (this.report) {
            this.report.push({ suggestionId: s, decision: 'pending' })
        } else {
            this.report = [{ suggestionId: s, decision: 'pending' }]
        }

    }

    toPublic() {
        return {
            ...super.toPublic(),
            discipline: this.discipline,
            assignedEditorInChief: this.assignedEditorInChief,
            assignedReviewers: this.assignedReviewers,
            assignedSuggestions: this.assignedSuggestions
        };
    }
}

export default AssociateEditor;