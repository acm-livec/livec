import Users from '../users.model.js';
import Admin from './admin.model.js';

class Admins extends Users {
    static Model = Admin;
    static roleKey = 'admins';
}

module.exports = Admins;
