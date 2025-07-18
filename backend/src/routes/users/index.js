const express = require('express');
const router = express.Router();



router.use('/community-member', require('./community-member.routes.js'));
router.use('/reviewer', require('./reviewer.routes.js'));
router.use('/associate-editor', require('./associate-editor.routes.js'));
router.use('/editor-in-chief', require('./editor-in-chief.routes.js'));

module.exports = router;
