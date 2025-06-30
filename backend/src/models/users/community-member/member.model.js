// models/CommunityMember.js
const User = require('../user.model');
const { Roles } = require('@constants'); // or wherever your role enum lives


class CommunityMember extends User {
    static role = Roles.COMMUNITY_MEMBER;
    static roleKey = 'communityMembers';

    constructor(data) {
        super({ ...data, role: CommunityMember.role });
        this.suggestions = data.suggestions || [];
    }

    addSuggestion(newSuggestionId) {
        this.suggestions.push(newSuggestionId)
    }

    toPublic() {
        return {
            ...super.toPublic(),
            suggestions: this.suggestions
        };
    }
}

module.exports = CommunityMember;