const express = require('express');

const { getSuggestions } = require('@controllers/users/reviewer/');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;