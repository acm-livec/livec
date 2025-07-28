class Curriculum {
    static dbRef;

    static injectDB(dbInstance) {
        this.dbRef = dbInstance;
    }

    constructor(ref) {
        this.currRef = ref

    }
    async returnAll() {
        await this.dbRef[this.currRef]?.tableOfContents.read();
        const toc = this.dbRef[this.currRef]?.tableOfContents.data;

        await this.dbRef[this.currRef]?.pageContent.read();
        const cont = this.dbRef[this.currRef]?.pageContent.data;

        const contentMap = new Map(cont.map(entry => [entry.id, {
            content: entry.content,
            html: entry.html
        }]));

        const merged = toc.map(section => {
            const contentEntry = contentMap.get(section.id) || {};
            let content = contentEntry.content || [];

            // ✅ Prepend new node if section.level !== 1
            if (section.level !== 1 && Array.isArray(content)) {
                const insert = {
                    type: 'h2',
                    children: [{ text: section.title }]
                };
                content = [insert, ...content];
            }

            return {
                ...section,
                content
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

        if (section.level !== 1) {
            console.log(section)
            const originalContent = contentMap.get(id) || [];

            const introObject = {
                type: 'h2',
                text: section.title,
                // ...any other props you want
            };

            return {
                ...section,
                content: [introObject, ...originalContent]
            };
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
    async updateToc(sectionInstance) {
        await this.dbRef[this.currRef]?.tableOfContents.read();

        const index = this.dbRef[this.currRef]?.tableOfContents.data.findIndex(s => s.id === sectionInstance.id);
        if (index === -1) throw new Error(`Suggestion with id ${sectionInstance.id} not found`);

        this.dbRef[this.currRef].tableOfContents.data[index] = sectionInstance;
        await this.dbRef[this.currRef]?.tableOfContents.write();

        return sectionInstance;
    }




    /**
     * Updates an existing suggestion in the database.
     *
     * @throws {Error} If the suggestion with the specified ID does not exist.
     */
    async update(sectionInstance) {
        await this.dbRef[this.currRef]?.pageContent.read();

        const index = this.dbRef[this.currRef]?.pageContent.data.findIndex(s => s.id === sectionInstance.id);
        if (index === -1) throw new Error(`Suggestion with id ${sectionInstance.id} not found`);

        this.dbRef[this.currRef].pageContent.data[index] = sectionInstance;
        await this.dbRef[this.currRef]?.pageContent.write();

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