import express from 'express';

import {  getSuggestions  } from '../controllers/users/community-member';

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


module.exports = router;