// src/models/User.js
import { Roles } from '@docs/constants/roles';

export default class User {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.role = data.role;
        this.discipline = data.discipline;
        this.permissions = data.permissions || [];
    }

    get isCommunityMember() {
        return this.role === Roles.COMMUNITY_MEMBER;
    }

    isAssociateEditor() {
        return this.role === Roles.ASSOCIATE_EDITOR;
    }
    isEditorInChief() {
        return this.role === Roles.EDITOR_IN_CHIEF;
    }

    /** Check if user has a given role */
    hasRole(role) {
        return this.role === role;
    }

    /** Check if user has a specific permission */
    can(permission) {
        return this.permissions.includes(permission);
    }

    /** Return formatted display name */
    get displayName() {
        return this.name || 'Anonymous';
    }

    // Add more domain logic as needed
}
