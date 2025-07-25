const { nanoid } = require('nanoid');

class ChangeSet {
    constructor(data = {}) {
        this.id = data.id || nanoid(8);
        this.section_id = data.section_id;
        this.edited_by = data.edited_by;
        this.timestamp = data.timestamp || new Date().toISOString();
        this.content = data.content || [];
    }

    toObject() {
        return {
            id: this.id,
            section_id: this.section_id,
            edited_by: this.edited_by,
            timestamp: this.timestamp,
            content: this.content
        };
    }
}

module.exports = ChangeSet;
