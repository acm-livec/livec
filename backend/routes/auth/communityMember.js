import express from 'express';
const router = express.Router();

// Mock Data
let communityMembers = []; 

router.post('/register', (req, res) => {
  const { CMFirstName, CMLastName, CMEmail, CMCellPhone } = req.body;

  if (!CMFirstName || !CMLastName || !CMEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMember = {
    CMID: communityMembers.length + 1,
    CMFirstName,
    CMLastName,
    CMEmail,
    CMCellPhone,
  };

  communityMembers.push(newMember);
  res.status(201).json(newMember);
});

router.get('/', (req, res) => {
  res.json(communityMembers);
});

export default router;
