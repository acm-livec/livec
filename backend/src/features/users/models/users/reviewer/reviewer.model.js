// models/CommunityMember.js
const User = require('../user.model');
const { Roles } = require('../../../../../../../docs/constants/roles.js');


class Reviewer extends User {
    static role = Roles.REVIEWER;
    static roleKey = 'reviewers';

    constructor(data) {
        super({ ...data, role: Reviewer.role });
        this.discipline = data.discipline || 'none';
        this.assignedEditorInChief = data.assignedEditorInChief || 'none'
        this.assignedAssociateEditor = data.assignedAssociateEditor || 'none'
        this.assignedSuggestions = data.assignedSuggestions || [];
    }

    assignSuggestion(newSuggestionId) {
        this.assignedSuggestions.push(newSuggestionId)
    }

    toPublic() {
        return {
            ...super.toPublic(),
            suggestions: this.assignedSuggestions
        };
    }
}

module.exports = Reviewer;