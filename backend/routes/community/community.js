import express from 'express';

const router = express.Router();

// Mock Data
let communityMembers = [
  {
    CMID: '1',
    CMLastName: 'Doe',
    CMFirstName: 'Jane',
    CMEmail: 'jane.doe@example.com',
    CMCellPhone: '123-456-7890'
  }
];

router.get('/', (req, res) => {
  res.json(communityMembers);
});

router.post('/', (req, res) => {
  const { CMLastName, CMFirstName, CMEmail, CMCellPhone } = req.body;
  const newMember = {
    CMID: String(communityMembers.length + 1),
    CMLastName,
    CMFirstName,
    CMEmail,
    CMCellPhone
  };
  communityMembers.push(newMember);
  res.status(201).json(newMember);
});

export default router;
