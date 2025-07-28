import linkCommunityMemberToSuggestion from './link-user';
import assignAssociateEditorToSuggestion from './assign-editor';
import handleRejectSuggestion from './handle-reject';
import handleNewSuggestion from './handle-suggestion';
import getSuggestionById from './get-one';
import handleStartSuggestionReviewProcess from './handle-start';
import assignReviewersToSuggestion from './assign-reviewers';
import addNewDocumentationToSuggestion from './add-documentation';
import associateEditorFinalized from './finalize';
import handleEditorInChiefApproval from './handle-approval';
import sendChangeRequestToAssociateEditor from './send-change';
import handleDeferSuggestionToReviewer from './handle-deferral';
import addRecommendationFromReviewer from './handle-recommendation';
import handleFinalDiscussion from './handle-discussion';
import updateVote from './update-vote';
import finalizeImplementation from './finalize-implementation';

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
