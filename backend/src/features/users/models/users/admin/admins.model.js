const Users = require('../users.model.js');
const Admin = require('./admin.model.js');

class Admins extends Users {
    static Model = Admin;
    static roleKey = 'admins';
}

module.exports = Admins;
