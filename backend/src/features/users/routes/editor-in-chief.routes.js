import express from 'express';

import {  getSuggestions  } from '../controllers/users/editor-in-chief';

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;