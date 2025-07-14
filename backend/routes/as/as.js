import express from 'express';

const router = express.Router();

// Mock data
const approvedVersions = [
  {
    versionId: 'CS-2023',
    discipline: 'Computer Science',
    approvedDate: '2025-01-01',
    summary: 'Incorporates feedback from 2023 and updates on AI/ML'
  },
  {
    versionId: 'IT-2017',
    discipline: 'Information Technology',
    approvedDate: '2025-02-01',
    summary: 'Updated with cybersecurity and cloud computing topics'
  }
];

router.get('/approved-curricula', (req, res) => {
  res.json(approvedVersions);
});

export default router;
