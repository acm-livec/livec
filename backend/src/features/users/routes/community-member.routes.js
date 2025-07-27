const express = require('express');

const { getSuggestions } = require('@features/users/controllers/users/community-member');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;