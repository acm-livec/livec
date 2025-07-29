import express from 'express';

import {  getSuggestions, getReviewers, getFinalSuggestions  } from "../controllers/users/associate-editor/index.js";

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);
router.get('/:userId/suggestions/final', getFinalSuggestions);
router.get('/:userId/reviewers', getReviewers);



export default router;