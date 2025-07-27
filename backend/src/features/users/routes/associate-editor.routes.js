const express = require('express');

const { getSuggestions, getReviewers, getFinalSuggestions } = require('@features/users/controllers/associate-editor');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);
router.get('/:userId/suggestions/final', getFinalSuggestions);
router.get('/:userId/reviewers', getReviewers);



module.exports = router;