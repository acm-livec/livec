const express = require('express');

const { getSuggestions, getReviewers } = require('@controllers/users/associate-editor');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);
router.get('/:userId/reviewers', getReviewers);



module.exports = router;