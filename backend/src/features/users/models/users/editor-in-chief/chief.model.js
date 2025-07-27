// models/CommunityMember.js
const User = require('../user.model');
const { Roles } = require('@docs/constants/roles.js');


class EditorInChief extends User {
    static role = Roles.EDITOR_IN_CHIEF;
    static roleKey = 'chiefEditors';

    constructor(data) {
        super(data)
        this.discipline = data.discipline || 'none';
        this.assignedAssociateEditors = data.assignedAssociateEditors || []
        this.assignedSuggestions = data.assignedSuggestions || [];
    }

    assignSuggestion(newSuggestionId) {
        if (!this.assignedSuggestions.includes(newSuggestionId)) {
            this.assignedSuggestions.push(newSuggestionId)
        }
    }

    getAllAssociateEditors() {
        console.log("inside", this.assignedAssociateEditors)
        return this.assignedAssociateEditors
    }

    toPublic() {
        return {
            ...super.toPublic(),
            suggestions: this.assignedSuggestions
        };
    }
}

module.exports = EditorInChief;