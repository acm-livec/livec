import CurriculumVersion from "./curriculum-version.model.js";
import kebabToCamel from "../../../shared/utils/kebabToCamel.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import db from '../../../database/database.js';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const resolve = (...segments) => path.resolve(__dirname, ...segments);
class CurriculumVersions {
    static dbRef = db.curriculums;

    static async getAll(curriculum) {
        await this.dbRef[curriculum].curriculumVersions.read();
        return this.dbRef[curriculum].curriculumVersions.data.map(v => new CurriculumVersion(v));
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
        await this.dbRef[curriculum].curriculumVersions.read();
        let found = this.dbRef[curriculum].curriculumVersions.data.find(v => v.id === id);

        if (!found) {
            const tocRef = this.dbRef?.[curriculum]?.tableOfContents;
            if (tocRef) {
                await tocRef.read();
                const exists = tocRef.data.some(section =>
                    Array.isArray(section.meta?.previous_versions) &&
                    section.meta.previous_versions.includes(id)
                );

                if (exists) {
            try {
                const defaults = require(
                    resolve(`../../../database/data/curriculums/${curriculum}/default/versions.json`)
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
        const currKey = kebabToCamel(curriculum);
        const ref = this.dbRef?.[currKey]?.curriculumVersions;
        if (!ref) return null;

        await ref.read();
        ref.data.push(version);
        await ref.write();
        return version;
    }
}

export default CurriculumVersions;
