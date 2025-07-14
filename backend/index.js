import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import recommendationRoutes from './routes/recommendation.js';
import notifyRoutes from './routes/notify.js';
import reviewerRoutes from './routes/reviewer.js';
import reviewRoutes from './routes/review.js';
import aeRoutes from './routes/ae.js';
import proposalRoutes from './routes/proposalRoutes.js';
import aeFinalRecommendationRoutes from './routes/aeFinalRecommendation.js';
import curriculumRoutes from './routes/curriculum.js';
import revisionResponseRoutes from './routes/revisionResponse.js';
import deskRejectRoutes from './routes/deskReject.js';
import eicRoutes from './routes/eic.js';
import eicCurriculumReviewRoutes from './routes/eicCurriculumReview.js';

import asRoutes from './routes/as/as.js';
import asNotificationRoutes from './routes/as/asNotification.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/livec');

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

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
