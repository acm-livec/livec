import {  generateRandomId  } from '../../../../shared/utils/generate-id'; 

class PublicMessage {
    constructor({refId = generateRandomId(), status, date = new Date().toISOString(), message, author = 'LiveC'}) {
        this.refId = refId;
        this.status = status;
        this.date = date;
        this.message = message;
        this.author = author;
    }

    toObject() {
        return {
            refId: this.refId,
            status: this.status,
            author: this.author,
            date: this.date,
            message: this.message
        };
    }
}

module.exports = PublicMessage