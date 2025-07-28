// models/CommunityMember.js
import User from '../user.model';
import {  Roles  } from '../../../../../shared/constants';

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