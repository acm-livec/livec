import express from 'express';
const router = express.Router();

router.get('/ui', (req, res) => {
  res.json({
    standardButtons: ['Home', 'Help', 'Submit', 'Cancel'],
    font: 'Roboto',
    theme: 'Light with rounded corners',
    errorDisplay: 'Inline red text',
  });
});

export default router;
