const express = require('express');

const { postLogin, postRegister } = require('@features/auth/controllers');

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

module.exports = router;