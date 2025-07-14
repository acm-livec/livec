const express = require('express');

const { 
    postSuggestion, postRejection, getSuggestion, 
    postStartReview, postReviewers, postDocumentation, 
    postAssociateEditorFinalization, postEditorInChiefApproval, 
    postChangeRequest 
} = require('@controllers/suggestion/');

const router = express.Router();


router.get('/:id', getSuggestion);

router.post('/', postSuggestion);

router.post('/:id/reject', postRejection);
router.post('/:id/start-review', postStartReview);
router.post('/:id/assign-reviewers', postReviewers);
router.post('/:id/add-docs', postDocumentation)
router.post('/:id/finalize', postAssociateEditorFinalization)


router.post('/:id/approve', postEditorInChiefApproval)
router.post('/:id/change-request', postChangeRequest)





module.exports = router;