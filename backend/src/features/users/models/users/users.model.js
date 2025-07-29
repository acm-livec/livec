// models/Users.js
import db from '../../../../database/database.js';

export default class Users {
    static dbRef = db.users;
    static registry = {};

    static registerRole(roleKey, CollectionClass) {
        this.registry[roleKey] = CollectionClass;
    }

    static getDbRef() {
        const dbRef = this.dbRef[this.roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${this.roleKey}`);
        return dbRef;
    }
    /**
     * Cross-role registry used by global methods like findGlobalByEmail()
     * Each entry maps a role key to its plural model class
     */
    static getRegistry() {
        return this.registry;
    }

    /**
    * Get all users across all roles
    */
    static async getAllGlobal() {
        const results = [];
        const registry = this.getRegistry();

        for (const [roleKey, CollectionClass] of Object.entries(registry)) {
            const dbRef = this.dbRef[roleKey];
            if (!dbRef) continue;

            await dbRef.read();
            const Model = CollectionClass.Model;

            const users = dbRef.data.map(user => new Model(user));
            results.push(...users);
        }

        return results;
    }

    /**
     * Cross-role global lookup: find a user by email across all roles
     */
    static async findGlobalByEmail(email) {
        const registry = this.getRegistry();

        for (const roleKey of Object.keys(registry)) {
            const dbRef = this.dbRef[roleKey];
            if (!dbRef) continue;

            await dbRef.read();
            const foundUser = dbRef.data.find(user => user.email === email);

            if (foundUser) {
                const CollectionClass = registry[roleKey];
                const Model = CollectionClass.Model;
                return new Model(foundUser);
            }
        }

        return null;
    }

    /**
     * Role-specific: get all users for this subclass
     */
    static async getAll() {
        const dbRef = this.dbRef[this.roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${this.roleKey}`);

        await dbRef.read();
        return dbRef.data.map(user => new this.Model(user));
    }

    /**
     * Role-specific: find one user by ID
     */
    static async findById(id) {
        const dbRef = this.dbRef[this.roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${this.roleKey}`);

        await dbRef.read();
        const record = dbRef.data.find(user => user.id === id);
        return record ? new this.Model(record) : null;
    }

    /**
     * Role-specific: find one user by email
     */
    static async findByEmail(email) {
        const dbRef = this.dbRef[this.roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${this.roleKey}`);

        await dbRef.read();
        const record = dbRef.data.find(user => user.email === email);
        return record ? new this.Model(record) : null;
    }

    /**
     * Role-specific: insert a new user instance
     */
    static async insert(data) {
        const instance = new this.Model(data);
        return this._insertFromRole(this.roleKey, instance);
    }

    /**
     * Role-specific: update an existing user instance
     */
    static async update(userInstance) {
        const dbRef = this.dbRef[this.roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${this.roleKey}`);

        await dbRef.read();

        const index = dbRef.data.findIndex(u => u.id === userInstance.id);
        if (index === -1) throw new Error(`User with id ${userInstance.id} not found`);

        dbRef.data[index] = userInstance;
        await dbRef.write();

        return userInstance;
    }

    /**
     * Internal helper to insert based on roleKey
     */
    static async _insertFromRole(roleKey, userInstance) {
        const dbRef = this.dbRef[roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${roleKey}`);

        await dbRef.read();
        dbRef.data.push(userInstance);
        await dbRef.write();

        return userInstance;
    }

    /**
     * Internal helper to get all users for a specific roleKey/Model
     */
    static async _getFromRole(roleKey, Model) {
        const dbRef = this.dbRef[roleKey];
        if (!dbRef) throw new Error(`No DB found for role: ${roleKey}`);

        await dbRef.read();
        return dbRef.data.map(user => new Model(user));
    }
}

