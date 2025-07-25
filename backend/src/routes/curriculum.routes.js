const express = require('express');
const { getCurriculum, getSection, updateSection, postVersion } = require('@controllers/curriculum')

const router = express.Router();


router.get('/:curriculum', getCurriculum);
router.get('/:curriculum/sections/:sectionId', getSection);
router.put('/:curriculum/sections/:sectionId', updateSection);
router.post('/:curriculum/versions', postVersion);

module.exports = router;