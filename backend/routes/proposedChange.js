import express from 'express';
const router = express.Router();

// Mock Data
let proposedChanges = [];

router.post('/submit', (req, res) => {
  const { title, description, submittedBy } = req.body;

  if (!title || !description || !submittedBy) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newChange = {
    id: proposedChanges.length + 1,
    title,
    description,
    submittedBy,
    dateSubmitted: new Date().toISOString(),
  };

  proposedChanges.push(newChange);
  res.status(201).json({ message: 'Proposed change submitted successfully', data: newChange });
});

router.get('/', (req, res) => {
  res.json(proposedChanges);
});

export default router;
