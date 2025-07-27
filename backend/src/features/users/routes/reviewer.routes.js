const express = require('express');

const { getSuggestions } = require('@features/users/controllers/users/reviewer');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;