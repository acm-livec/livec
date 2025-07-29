import Curriculum from "./curriculum.model.js";
import db from '../../../database/database.js';



class Curriculums {
    static dbRef = db.curriculums;


    /**
     * Retrieves all Curriculums from the database.
     *
     * @returns {Promise<Curriculum[]>} An array of Curriculum instances.
     */
    static async getAll() {
        await this.dbRef.read();
        return this.dbRef.data.map(entry => new Curriculum(entry));
    }


    /**
     * Finds a curriculum by its unique ID.
     *
     * @param {string} id - The unique identifier of the curriculum.
     * @returns {Promise<Curriculum|null>} The Curriculum instance if found, otherwise null.
     */
    static async findById(id) {
        await this.dbRef.read();

        const entry = this.dbRef.data.find(s => s.id === id);
        return entry ? new Curriculum(entry) : null;
    }
    /**
     * Finds a curriculum by its unique ID.
     *
     * @param {string} c - The unique identifier of the curriculum.
     * @returns {Promise<Curriculum|null>} The Curriculum instance if found, otherwise null.
     */
    static async findByCurriculum(c) {
        return new Curriculum(c)
    }






    /**
     * Inserts a new suggestion into the database.
     *
     * @param {Object} data - The raw suggestion data.
     * @returns {Promise<Curriculum>} The newly created Curriculum instance.
     */
    static async insert(data) {
        const suggestion = new Curriculum({
            ...data,
        });

        await this.dbRef.read();
        this.dbRef.data.push(suggestion);
        await this.dbRef.write();

        return suggestion;
    }



    /**
     * Updates an existing suggestion in the database.
     *
     * @param {Suggestion} suggestionInstance - The Curriculum instance to update.
     * @returns {Promise<Suggestion>} The updated Curriculum instance.
     * @throws {Error} If the suggestion with the specified ID does not exist.
     */
    static async update(curr, sect) {
        await this.dbRef.read();

        const index = this.dbRef.data.findIndex(s => s.id === suggestionInstance.id);
        if (index === -1) throw new Error(`Suggestion with id ${suggestionInstance.id} not found`);

        this.dbRef.data[index] = suggestionInstance;
        await this.dbRef.write();

        return suggestionInstance;
    }




    /**
     * Deletes a suggestion by its unique ID.
     *
     * @param {string} id - The unique identifier of the suggestion to delete.
     * @returns {Promise<void>}
     */
    static async deleteById(id) {
        await this.dbRef.read();
        this.dbRef.data = this.dbRef.data.filter(s => s.id !== id);
        await this.dbRef.write();
    }
}

export default Curriculums;
