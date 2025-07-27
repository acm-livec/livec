const express = require('express');
const router = express.Router();



router.use('/community-member', require('./routes/community-member.routes.js'));
router.use('/reviewer', require('./routes/reviewer.routes.js'));
router.use('/associate-editor', require('./routes/associate-editor.routes.js'));
router.use('/editor-in-chief', require('./routes/editor-in-chief.routes.js'));

module.exports = router;
