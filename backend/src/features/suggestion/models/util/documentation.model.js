import { generateRandomId } from '../../../../shared/utils/generate-id';
import { Actions } from '../../../../shared/constants';

const defaultAction = Actions.ADDED_DOCUMENTATION

class Documentation {

    constructor({ action = defaultAction, author = 'LiveC', content, date = new Date().toISOString(), refId = generateRandomId() }) {
        this.action = action;
        this.refId = refId;
        this.author = author;
        this.date = date;
        this.content = content;
    }


    toObject() {
        return {
            action: this.action,
            refId: this.refId,
            author: this.author,
            date: this.date,
            content: this.content
        };
    }

    toJSON() {
        return {
            action: this.action,
            refId: this.refId,
            author: this.author,
            date: this.date,
            text: this.content
        };
    }
}


module.exports = Documentation