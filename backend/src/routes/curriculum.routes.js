const express = require('express');
const { getCurriculum } = require('@controllers/curriculum')

const router = express.Router();


router.get('/:curriculum', getCurriculum);

module.exports = router;