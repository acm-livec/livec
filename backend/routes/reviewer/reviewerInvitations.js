import express from 'express';
const router = express.Router();

// Mock Data
const mockInvitations = [
  {
    id: 1,
    proposalTitle: 'Improve Learning Outcomes in AI Module',
    proposer: 'Jane Smith',
    summary: 'This proposal suggests clarifying objectives in AI curriculum',
  },
];

router.get('/invitation', (req, res) => {
  res.json(mockInvitations);
});

router.get('/invitation', (req, res) => {
  res.json({
    proposalId: 'PC123',
    proposalTitle: 'Improve Intro to CS',
    aeName: 'Dr. Smith',
    message: 'Please review the proposed change',
  });
});

router.post('/invitation/respond', (req, res) => {
  const { invitationId, response } = req.body;
  if (!invitationId || !response) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  console.log(`Reviewer response to invitation ${invitationId}: ${response}`);
  res.json({ success: true, message: 'Response recorded' });
});

export default router;
