// models/CommunityMembers.js
const Users = require('../users.model');
const AssociateEditor = require('./editor.model');

class AssociateEditors extends Users {
    static roleKey = 'associateEditors';
    static Model = AssociateEditor;

    static async getByDiscipline(discipline) {
        const dbRef = this.getDbRef(); // ✅ clean and centralized
        await dbRef.read();

        const matches = dbRef.data
            .filter(user => user.discipline === discipline)
            .map(user => new this.Model(user));

        return matches;
    }
}

module.exports = AssociateEditors;
