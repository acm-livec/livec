import express from 'express';
const router = express.Router();

router.post('/recommend', (req, res) => {
  const { proposalId, recommendation, justification } = req.body;

  console.log('Received recommendation:', { proposalId, recommendation, justification });

  res.json({ message: 'Recommendation submitted successfully' });
});

export default router;
