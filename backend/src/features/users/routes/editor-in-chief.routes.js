const express = require('express');

const { getSuggestions } = require('@features/users/controllers/users/editor-in-chief');

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;