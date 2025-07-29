import User from "../user.model.js";
import { Roles } from '../../../../../../../shared/constants/index.js';

class Admin extends User {
    static role = Roles.ADMIN;
    static roleKey = 'admins';

    constructor(data) {
        super({ ...data, role: Admin.role });
    }
}

export default Admin;
