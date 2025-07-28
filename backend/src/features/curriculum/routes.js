import express from 'express';
import { getCurriculum, getSection, updateSection, postVersion, getVersion } from './controllers';

const router = express.Router();

router.get('/:curriculum', getCurriculum);
router.get('/:curriculum/sections/:sectionId', getSection);
router.put('/:curriculum/sections/:sectionId', updateSection);
router.post('/:curriculum/versions', postVersion);
router.get('/:curriculum/versions/:versionId', getVersion);

module.exports = router;
