import Users from '../users.model.js';
import Reviewer from './reviewer.model.js';


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

Users.registerRole(Reviewers.roleKey, Reviewers);

export default Reviewers;
