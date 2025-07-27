const Users = require('../users.model.js');
const Reviewer = require('./reviewer.model.js');


class Reviewers extends Users {
    static Model = Reviewer;
    static roleKey = 'reviewers';

    static async getByAssociateEditor(userId) {
        const dbRef = this.getDbRef(); 
        await dbRef.read();

        const matches = dbRef.data
            .filter(reviewer => reviewer.assignedAssociateEditor === userId)
            .map(reviewer => new this.Model(reviewer));

        return matches;
    }

}

module.exports = Reviewers;
