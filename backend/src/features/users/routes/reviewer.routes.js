const express = require('express');

const { getSuggestions } = require('@features/users/controllers/reviewer/');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;