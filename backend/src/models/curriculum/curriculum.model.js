const db = require('@database/database');

class Curriculum {
    dbRef = db.curriculums
    constructor(ref) {
        this.currRef = ref

    }

    async returnAll() {
        await this.dbRef[this.currRef]?.tableOfContents.read();
        const toc = this.dbRef[this.currRef]?.tableOfContents.data;

        await this.dbRef[this.currRef]?.pageContent.read();
        const cont = this.dbRef[this.currRef]?.pageContent.data;

        // Store both html and content in the Map
        const contentMap = new Map(cont.map(entry => [entry.id, {
            html: entry.html,
            content: entry.content
        }]));

        const merged = toc.map(section => {
            const contentEntry = contentMap.get(section.id) || {};
            return {
                ...section,
                html: contentEntry.html || "",
                content: contentEntry.content || ""
            };
        });

        return merged;
    }


    async getSection(id) {
        await this.dbRef[this.currRef]?.tableOfContents.read();
        const toc = this.dbRef[this.currRef]?.tableOfContents.data;
        await this.dbRef[this.currRef]?.pageContent.read();
        const cont = this.dbRef[this.currRef]?.pageContent.data;

        const contentMap = new Map(cont.map(entry => [entry.id, entry.content]));
        const section = toc.find(section => section.id === id);

        if (!section) {
            return null; // or handle not found scenario as needed
        }

        return {
            ...section,
            content: contentMap.get(id) || ""
        };
    }


    async getSectionToc(id) {
        await this.dbRef[this.currRef]?.tableOfContents.read();
        const toc = this.dbRef[this.currRef]?.tableOfContents.data;
        

        const section = toc.find(section => section.id === id);

        if (!section) {
            return null; // or handle not found scenario as needed
        }

        return section
    }


    

    /**
     * Updates an existing suggestion in the database.
     *
     * @throws {Error} If the suggestion with the specified ID does not exist.
     */
     async update(sectionInstance) {
        await this.dbRef[this.currRef]?.tableOfContents.read();

        const index = this.dbRef[this.currRef]?.tableOfContents.data.findIndex(s => s.id === sectionInstance.id);
        if (index === -1) throw new Error(`Suggestion with id ${sectionInstance.id} not found`);

        this.dbRef[this.currRef].tableOfContents.data[index] = sectionInstance;
        await this.dbRef[this.currRef]?.tableOfContents.write();

        return sectionInstance;
    }
}

module.exports = Curriculum



// this.id = data.id || '';
// this.title = data.title || '';
// this.page_number = data.page_number || null;           // ADD THIS
// this.markdown_heading = data.markdown_heading || '';   // ADD THIS
// this.markdown_body = data.markdown_body || '';         // ADD THIS
// this.html = data.html ||''
// this.meta = data.meta || {};
// this.units = data.units || [];