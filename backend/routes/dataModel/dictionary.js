import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  const mockDictionary = [
    {
      name: 'Proposal',
      fields: [
        { name: 'title', type: 'String', length: 100, required: true },
        { name: 'summary', type: 'Text', required: false }
      ]
    },
    {
      name: 'Reviewer',
      fields: [
        { name: 'name', type: 'String', length: 50, required: true }
      ]
    }
  ];

  res.json(mockDictionary);
});

export default router;
