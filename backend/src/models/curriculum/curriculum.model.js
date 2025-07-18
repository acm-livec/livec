const { generateSuggestionId } = require('@utils/generate-id');
const { Status, Step } = require('@utils/constants');
const Documentation = require('../util/documentation.model')

class Curriculum {
    constructor(data) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.page_number = data.page_number || null;           // ADD THIS
        this.markdown_heading = data.markdown_heading || '';   // ADD THIS
        this.markdown_body = data.markdown_body || '';         // ADD THIS
        this.html = data.html ||''
        this.meta = data.meta || {};
        this.units = data.units || [];
    }
}

module.exports = Curriculum