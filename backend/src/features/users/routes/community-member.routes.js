import express from 'express';

import {  getSuggestions  } from "../controllers/users/community-member/index.js";

const router = express.Router();

router.get('/:userId/suggestions', getSuggestions);


export default router;