const db = require('@database/database');
const CurriculumVersion = require('./curriculum-version.model');

class CurriculumVersions {
    static dbRef = db.curriculumVersions;

    static async getAll(curriculum) {
        await this.dbRef[curriculum].read();
        return this.dbRef[curriculum].data.map(v => new CurriculumVersion(v));
    }

    /**
     * Retrieves a curriculum version by ID. If the version is not present
     * in the primary versions file, this method will check whether the ID
     * is referenced in the table_of_contents `previous_versions` array. If
     * so, it attempts to load the version from the default versions file
     * bundled with the database.
     *
     * @param {string} curriculum - curriculum identifier (e.g. 'computer-science')
     * @param {string} id - version identifier
     * @returns {Promise<CurriculumVersion|null>} the version instance if found
     */
    static async getById(curriculum, id) {
        await this.dbRef[curriculum].read();
        let found = this.dbRef[curriculum].data.find(v => v.id === id);

        if (!found) {
            const tocRef = db.curriculums?.[curriculum]?.tableOfContents;
            if (tocRef) {
                await tocRef.read();
                const exists = tocRef.data.some(section =>
                    Array.isArray(section.meta?.previous_versions) &&
                    section.meta.previous_versions.includes(id)
                );

                if (exists) {
                    try {
                        const defaults = require(
                            `@database/data/curriculums/${curriculum}/default/versions.json`
                        );
                        found = defaults.find(v => v.id === id);
                    } catch (err) {
                        found = null;
                    }
                }
            }
        }

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
