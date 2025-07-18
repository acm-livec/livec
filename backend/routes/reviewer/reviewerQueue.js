import express from 'express';
const router = express.Router();

// Mock Data
router.get('/queue', (req, res) => {
  const dummyProposals = [
    {
      id: 'P001',
      title: 'Proposal to Add Ethics Section',
      summary: 'Introduce ethical computing practices into curriculum.',
      history: ['Initial draft submitted', 'Reviewed by AE'],
    },
    {
      id: 'P002',
      title: 'Proposal to Expand Data Science Topics',
      summary: 'Include deep learning and MLOps.',
      history: ['Initial draft submitted'],
    },
  ];

  res.json(dummyProposals);
});

export default router;
