import express from 'express';

import {  postLogin, postRegister  } from './controllers';

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

module.exports = router;