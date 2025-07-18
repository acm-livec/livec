const { nanoid } = require('nanoid');
const { Status } = require('@utils/constants');


/*------------------------------------------------------------------------------*/

const rolePrefixMap = {
    'community-member': 'CM',
    'reviewer': 'R',
    'associate-editor': 'AE',
    'editor-in-chief': 'EIC',
};

/**
 * Generate a unique user ID with a prefix based on the role.
 * @param {string} key - One of the keys from prefixMap (e.g., 'REVIEWER')
 * @param {number} length - Length of the random ID (default 8)
 * @returns {string} e.g., 'R-5g8A1xQz'
 * 
**/

const generateUserId = (key, length = 5) => {
    const prefix = rolePrefixMap[key];

    if (!prefix) {
        throw new Error(`❌ Invalid key: ${key}`);
    }

    return `${prefix}-${nanoid(length)}`;
}

/*------------------------------------------------------------------------------*/

const disciplinePrefixMap = {
    'computer-science': 'COSC',
    'cybersecurity': 'CYBR',
    'information-systems': 'IS',
    'closed': 'CLX'
}

/**
 * Generate a unique suggestion ID with a prefix based on its associated discipline.
 * @param {string} key - One of the keys from disciplinePrefixMap (e.g., 'computer-science')
 * @param {number} length - Length of the random ID (default 8)
 * @returns {string} e.g., 'R-5g8A1xQz'
 * 
**/

const generateSuggestionId = (key = Status.System.CLOSED, length = 8) => {
    const prefix = disciplinePrefixMap[key];

    if (!prefix) {
        throw new Error(`❌ Invalid key: ${key}`);
    }

    return `S${prefix}-${nanoid(length)}`;
}

/*------------------------------------------------------------------------------*/

const generateRandomId = (length = 8) => {
    return `DOC-${nanoid(length)}`;
}



async function hashID(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


const generateSectionId = async (curriculum, year, pageNumber, sectionTitle, sectionVersion) => {
    const input = `${curriculum}:${year}:${pageNumber}:${sectionTitle.trim().toLowerCase()}:${sectionVersion}`;
    return (await hashID(input)).slice(0, 12); // Short stable ID
}



module.exports = { generateUserId, generateSuggestionId, generateRandomId, generateSectionId }

