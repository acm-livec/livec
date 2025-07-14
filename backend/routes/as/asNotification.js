import express from 'express';

const router = express.Router();

router.post('/notify-change', async (req, res) => {
  const { changeTitle, description, notifiedBy } = req.body;

  if (!changeTitle || !notifiedBy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`Notification sent for change: ${changeTitle} by ${notifiedBy}`);
  res.json({ message: 'Notification sent to ACM Staff' });
});

export default router;
