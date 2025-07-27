/**
 * @typedef {Object} Suggestion
 *
 * @property {string} id - Unique identifier for the suggestion.
 * @property {string} title - Title of the suggestion.
 * @property {string} text - Full suggestion text submitted by the user.
 * @property {string} submitterId - ID of the member who submitted the suggestion.
 * @property {string} sectionId - ID of the section the suggestion is related to.
 * @property {string} timeCreated - ISO timestamp of when the suggestion was created.
 * @property {Object} status - Object representing status from different perspectives.
 * @property {string} status.forMember - Status visible to community members.
 * @property {string} status.forAssociateEditor - Status for the Associate Editor.
 * @property {string} status.forEditorInChief - Status for the Editor in Chief.
 * @property {string} status.system - Internal system-level status.
 * @property {string} discipline - The academic or content discipline of the suggestion.
 * @property {string} [assignedAssociateEditor] - ID of the assigned Associate Editor.
 * @property {string} [assignedEditorInChief] - ID of the assigned Editor in Chief.
 * @property {string[]} [assignedReviewers] - IDs of reviewers assigned to the suggestion.
 * @property {Object} meta - Optional key-value store for custom metadata.
 * @property {string} revisedSection - Updated or proposed content, such as HTML or Markdown.
 * @property {Array<PublicUpdate>} publicUpdates - User-facing status messages and updates.
 * @property {Array<DocumentationEntry>} documentation - Internal documentation and notes.
 * @property {Array<HistoryEntry>} history - Audit log of actions taken on the suggestion.
 */



/**
 * @typedef {Object} PublicUpdate
 * @property {string} refId - ID of the message or document.
 * @property {string} status - Status value at the time of the message.
 * @property {string} date - ISO timestamp when the update was posted.
 * @property {string} message - The content of the update message.
 * @property {string} author - ID or name of the person who posted the update.
 */



/**
 * @typedef {Object} DocumentationEntry
 * @property {string} action - Action label (e.g., 'start-review').
 * @property {string} refId - Reference document ID.
 * @property {string} author - ID of the user who added the note.
 * @property {string} date - ISO date string.
 * @property {string} text - Body text of the documentation entry.
 */



/**
 * @typedef {Object} HistoryEntry
 * @property {string} action - Action name or enum string.
 * @property {string} performed_by - ID of the person who performed the action.
 * @property {string} date - ISO timestamp when the action was logged.
 */
