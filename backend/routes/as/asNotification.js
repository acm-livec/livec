import express from 'express';
const router = express.Router();

// Mock Data
router.get('/notifications', (req, res) => {
  res.json([
    { id: 'n1', message: 'Curriculum Chapter 2 has been updated', date: '2025-07-19' },
    { id: 'n2', message: 'New curriculum version 3.0 has been posted', date: '2025-07-15' }
  ]);
});

export default router;


// import express from 'express';

// const router = express.Router();

// router.post('/notify-change', async (req, res) => {
//   const { changeTitle, description, notifiedBy } = req.body;

//   if (!changeTitle || !notifiedBy) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   console.log(`Notification sent for change: ${changeTitle} by ${notifiedBy}`);
//   res.json({ message: 'Notification sent to ACM Staff' });
// });

// export default router;
