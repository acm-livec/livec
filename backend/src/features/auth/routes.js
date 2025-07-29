import express from 'express';

import { postLogin, postRegister } from "./controllers/index.js";

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

export default router;