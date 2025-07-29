import {  nanoid  } from 'nanoid';

class CurriculumVersion {
    constructor(data = {}) {
        this.id = data.id || nanoid(8);
        this.section_version = data.section_version || '';
        this.contributing_member = data.contributing_member || '';
        this.meta = data.meta || {};
        this.content = Array.isArray(data.content) ? data.content : [];
    }

    toObject() {
        return {
            id: this.id,
            section_version: this.section_version,
            contributing_member: this.contributing_member,
            meta: this.meta,
            content: this.content
        };
    }
}

export default CurriculumVersion;
