/**
 * @typedef {Object} Section
 *
 * @property {string} id - Unique identifier for the section of the curriculum.
 * @property {number} index - Index of a section when entire Curriculum object is flattened.
 * @property {boolean} [isFirst] - If a section is the first page.
 * @property {boolean} [isLast] - If a section is the last page.
 * @property {string} title - Title of the section based on the table of contents.
 * @property {string} pageNumber - Page number of the section based on the associated curriciulum document.
 * @property {string} [markdownHeading] - Title of the page in .md format .
 * @property {string} [markdownBody] - Content of the page in .md format.
 * @property {string} [html] - Enitre content of the page in .html format.
 * @property {Array<Section>} [units] - Subunits of a page if it has some.
 * @property {Meta} meta - Object containing metadata for a section.
 * 
 */


/**
 * @typedef {Object} Meta
 *
 * @property {string} curriculum - The associated discipline of the section.
 * @property {string} yearVersion - Title of the suggestion.
 * @property {string} sectionVersion - Full suggestion text submitted by the user.
 * @property {Array<Section>} previousVersions - ID of the member who submitted the suggestion.
 * @property {string} slug - ID of the member who submitted the suggestion.
 * @property {string} createdAt - ID of the member who submitted the suggestion.
 * @property {string} updatedAt - ID of the member who submitted the suggestion.
 * 
 */
