import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';

import proposedChangeRoutes from './routes/proposedChange.js';
import communityMemberRoutes from './routes/auth/communityMember.js';
import editorRoutes from './routes/editor/editor.js';
import curriculumRoutes from './routes/curriculum/curriculum.js';

import interfaceRoutes from './routes/interface.js';

import reviewerInvitationRoutes from './routes/reviewer/reviewerInvitations.js';
import reviewerInvitations from './routes/reviewer/reviewerInvitations.js';
import reviewerQueueRoutes from './routes/reviewer/reviewerQueue.js';
import reviewerRecommendationRoutes from './routes/reviewer/reviewerRecommendation.js';

import recommendationRoutes from './routes/recommendation.js';
import notifyRoutes from './routes/notify.js';
import reviewerRoutes from './routes/reviewer.js';
import reviewRoutes from './routes/review.js';
import aeRoutes from './routes/ae.js';
import proposalRoutes from './routes/proposalRoutes.js';
import aeFinalRecommendationRoutes from './routes/aeFinalRecommendation.js';

import revisionResponseRoutes from './routes/revisionResponse.js';
import deskRejectRoutes from './routes/deskReject.js';
import eicRoutes from './routes/eic.js';
import eicCurriculumReviewRoutes from './routes/eicCurriculumReview.js';

import asRoutes from './routes/as/as.js';
import asNotificationRoutes from './routes/as/asNotification.js';
import approvedCurriculaRoutes from './routes/as/approvedCurricula.js';


import dataModelRoutes from './routes/dataModel/model.js';
import dictionaryRoutes from './routes/dataModel/dictionary.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

// mongoose.connect('mongodb://localhost:27017/livec');

app.use('/api/proposed-changes', proposedChangeRoutes);
app.use('/api/community-members', communityMemberRoutes);
app.use('/api/editors', editorRoutes);
app.use('/api/curriculum', curriculumRoutes);

app.use('/api/interface', interfaceRoutes);

app.use('/api/reviewer', reviewerInvitationRoutes);
app.use('/api/reviewer', reviewerInvitations);
app.use('/api/reviewer', reviewerQueueRoutes);
app.use('/api/reviewer', reviewerRecommendationRoutes);

app.use('/api/review', reviewRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/notify', notifyRoutes);
app.use('/api/reviewer', reviewerRoutes);
app.use('/api/ae', aeRoutes);
app.use('/api', proposalRoutes);
app.use('/api/ae-final-recommendation', aeFinalRecommendationRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/revision-response', revisionResponseRoutes);
app.use('/api/desk-reject', deskRejectRoutes);
app.use('/api/eic', eicRoutes);
app.use('/api/eic', eicCurriculumReviewRoutes);

app.use('/api/as', asRoutes);
app.use('/api/as', asNotificationRoutes);
app.use('/api/as', approvedCurriculaRoutes);
app.use('/api/as/notifications', asNotificationRoutes);

app.use('/api/datamodel', dataModelRoutes);
app.use('/api/datamodel/dictionary', dictionaryRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
