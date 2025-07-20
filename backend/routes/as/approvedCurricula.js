import express from 'express';
const router = express.Router();

// Mock Data
router.get('/approved/curricula', (req, res) => {
  res.json([
    { id: 'CURR001', version: '1.0', dateApproved: '2024-05-01' },
    { id: 'CURR002', version: '2.0', dateApproved: '2025-03-15' }
  ]);
});

export default router;
