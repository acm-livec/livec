import express from 'express';

const router = express.Router();

// ***** Mock Data *****

router.get('/proposals-for-eic', async (req, res) => {
  try {
    const mockProposals = [
      {
        _id: '1',
        title: 'Revise Algorithms Syllabus',
        summary: 'Proposal to include Dynamic Programming and Greedy strategies',
        aeRecommendation: 'Recommend Approval',
      },
      {
        _id: '2',
        title: 'Update Data Structures',
        summary: 'Add hash maps and graph traversal techniques',
        aeRecommendation: 'Needs Revisions',
      }
    ];

    res.json(mockProposals);
  } catch (err) {
    console.error('Mock fetch failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/proposal/:proposalId', async (req, res) => {
  const mockProposal = {
    _id: req.params.proposalId,
    title: 'Revise Algorithms Syllabus',
    summary: 'Proposal to include Dynamic Programming and Greedy strategies',
    aeRecommendation: 'Recommend Approval'
  };
  res.json(mockProposal);
});

router.get('/history', async (req, res) => {
  try {
    const mockHistory = [
      {
        proposalId: '1',
        title: 'Revise Algorithms Syllabus',
        aeRecommendation: 'Recommend Approval',
        eicDecision: 'Approved',
        finalDecision: 'Adopted',
        timestamp: '2024-05-01',
      },
      {
        proposalId: '2',
        title: 'Update Data Structures',
        aeRecommendation: 'Needs Revision',
        eicDecision: 'Rejected',
        finalDecision: 'Not Adopted',
        timestamp: '2024-06-10',
      }
    ];

    res.json(mockHistory);
  } catch (err) {
    console.error('Error loading history:', err);
    res.status(500).json({ error: 'Failed to load history' });
  }
});

router.post('/decision/:proposalId', async (req, res) => {
  const { eicDecision, eicJustification } = req.body;

  if (eicJustification && eicJustification.length > 500) {
    return res.status(400).json({ error: 'Justification exceeds 500 characters' });
  }

  console.log(`EIC Decision received for ${req.params.proposalId}:`, eicDecision, eicJustification);
  res.json({ message: 'EIC decision recorded' });
});

router.get('/board/recommendations', async (req, res) => {
  try {
    const reviewedRecommendations = [
      {
        _id: '1',
        title: 'Revise Algorithms Syllabus',
        aeRecommendation: 'Recommend Approval',
        eicDecision: 'Approve'
      },
      {
        _id: '2',
        title: 'Update Data Structures',
        aeRecommendation: 'Needs Revisions',
        eicDecision: 'Request Revision'
      }
    ];
    res.json(reviewedRecommendations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch board recommendations' });
  }
});

router.post('/board/decision/:proposalId', async (req, res) => {
  const { boardDecision } = req.body;

  if (!boardDecision) {
    return res.status(400).json({ error: 'Board decision is required' });
  }

  console.log(`Board decision for ${req.params.proposalId}:`, boardDecision);
  res.json({ message: 'Board decision saved successfully' });
});

router.post('/approve-curriculum-version', async (req, res) => {
  const { collectionId, approvedBy, notes } = req.body;

  if (!collectionId || !approvedBy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`Curriculum Collection ${collectionId} approved by ${approvedBy}`);
  res.json({ message: 'Curriculum collection approved as the next official version' });
});

export default router;
