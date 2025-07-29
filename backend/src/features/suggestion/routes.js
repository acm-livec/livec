import express from 'express';
import {
    postSuggestion,
    postRejection,
    getSuggestion,
    postStartReview,
    postAssignReviewers,
    postDocumentation,
    postAssociateEditorFinalization,
    postEditorInChiefApproval,
    postChangeRequest,
    postDeferral,
    postRecommednation,
    postDiscussion,
    postImplementation,
} from "./controllers/index.js";

const router = express.Router();


router.get('/:id', getSuggestion);

router.post('/', postSuggestion);

router.post('/:id/reject', postRejection);
router.post('/:id/start-review', postStartReview);
router.post('/:id/add-docs', postDocumentation)
router.post('/:id/finalize', postAssociateEditorFinalization)


router.post('/:id/approve', postEditorInChiefApproval)
router.post('/:id/change-request', postChangeRequest)

/**
 * 
 */
router.post('/:id/assign-reviewers', postAssignReviewers);


router.post('/:id/post-recommendation', postRecommednation);
router.post('/:id/start-discussion', postDiscussion);
router.post('/:id/implement', postImplementation);





/**
 * 
 */
router.post('/:id/defer', postDeferral);


export default router;