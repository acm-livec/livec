const User = require('../user.model');
const { Roles } = require('../../../../../../../docs/constants/roles.js');

class Admin extends User {
    static role = Roles.ADMIN;
    static roleKey = 'admins';

    constructor(data) {
        super({ ...data, role: Admin.role });
    }
}

module.exports = Admin;
