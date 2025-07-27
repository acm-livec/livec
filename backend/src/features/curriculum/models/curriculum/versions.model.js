const db = require('@database/database');
const CurriculumVersion = require('./curriculum-version.model');

class CurriculumVersions {
    static dbRef = db.curriculumVersions;

    static async getAll(curriculum) {
        await this.dbRef[curriculum].read();
        return this.dbRef[curriculum].data.map(v => new CurriculumVersion(v));
    }

    static async getById(curriculum, id) {
        await this.dbRef[curriculum].read();
        const found = this.dbRef[curriculum].data.find(v => v.id === id);
        return found ? new CurriculumVersion(found) : null;
    }

    static async insert(curriculum, data) {
        const version = new CurriculumVersion(data).toObject();
        await this.dbRef[curriculum].read();
        this.dbRef[curriculum].data.push(version);
        await this.dbRef[curriculum].write();
        return version;
    }
}

module.exports = CurriculumVersions;
