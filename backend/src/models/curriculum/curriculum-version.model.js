const { nanoid } = require('nanoid');
const ChangeSet = require('./change-set.model');

class CurriculumVersion {
    constructor(data = {}) {
        this.id = data.id || nanoid(8);
        this.version = data.version || 1;
        this.date = data.date || new Date().toISOString();
        this.changeSets = (data.changeSets || []).map(cs => new ChangeSet(cs).toObject());
    }

    toObject() {
        return {
            id: this.id,
            version: this.version,
            date: this.date,
            changeSets: this.changeSets
        };
    }
}

module.exports = CurriculumVersion;
