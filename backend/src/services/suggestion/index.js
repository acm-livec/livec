const linkCommunityMemberToSuggestion = require('./link-user');
const assignAssociateEditorToSuggestion = require('./assign-editor');
const handleRejectSuggestion = require('./handle-reject');
const handleNewSuggestion = require('./handle-suggestion');
const getSuggestionById = require('./get-one');
const handleStartSuggestionReviewProcess = require('./handle-start');
const assignReviewersToSuggestion = require('./assign-reviewers');
const addNewDocumentationToSuggestion = require('./add-documentation');
const associateEditorFinalized = require('./finalize');
const handleEditorInChiefApproval = require('./handle-approval');
const sendChangeRequestToAssociateEditor = require('./send-change');
const handleDeferSuggestionToReviewer = require('./handle-deferral');
const addRecommendationFromReviewer = require('./handle-recommendation');
const handleFinalDiscussion = require('./handle-discussion');
const updateVote = require('./update-vote');
const finalizeImplementation = require('./finalize-implementation');

module.exports = {
    handleRejectSuggestion,
    handleNewSuggestion,
    getSuggestionById,
    handleStartSuggestionReviewProcess,
    assignReviewersToSuggestion,
    addNewDocumentationToSuggestion,
    associateEditorFinalized,
    handleEditorInChiefApproval,
    sendChangeRequestToAssociateEditor,
    handleDeferSuggestionToReviewer,
    addRecommendationFromReviewer,
    handleFinalDiscussion,
    updateVote,
    finalizeImplementation,
};
