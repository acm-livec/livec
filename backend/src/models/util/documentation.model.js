const { generateRandomId } = require('@utils/generate-id');
const { Actions } = require('@utils/constants')

const defaultAction = Actions.ADDED_DOCUMENTATION

class Documentation {

    constructor({ action = defaultAction, author = 'LiveC', text, date = new Date().toISOString(), refId = generateRandomId() }) {
        this.action = action;
        this.refId = refId;
        this.author = author;
        this.date = date;
        this.text = text;
    }


    toObject() {
        return {
            action: this.action,
            refId: this.refId,
            author: this.author,
            date: this.date,
            text: this.text
        };
    }

    toJSON() {
        return {
            action: this.action,
            refId: this.refId,
            author: this.author,
            date: this.date,
            text: this.text
        };
    }
}


module.exports = Documentation