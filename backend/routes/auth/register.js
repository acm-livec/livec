import express from 'express';
const router = express.Router();

let communityMembers = []; 

router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, email, phone } = req.body;

  if (!username || !password || !firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = { id: Date.now(), username, password }; 

  const communityMember = {
    CMID: String(Date.now()),
    CMFirstName: firstName,
    CMLastName: lastName,
    CMEmail: email,
    CMCellPhone: phone || ''
  };
  communityMembers.push(communityMember);

  res.status(201).json({ message: 'User registered', user, communityMember });
});
