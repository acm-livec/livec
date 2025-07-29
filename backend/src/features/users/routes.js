import express from 'express';
import communityMemberRouter from './routes/community-member.routes.js';
import reviewerRouter from './routes/reviewer.routes.js';
import associateEditorRouter from './routes/associate-editor.routes.js';
import editorInChiefRouter from './routes/editor-in-chief.routes.js';

const router = express.Router();

router.use('/community-member', communityMemberRouter);
router.use('/reviewer', reviewerRouter);
router.use('/associate-editor', associateEditorRouter);
router.use('/editor-in-chief', editorInChiefRouter);

export default router;
