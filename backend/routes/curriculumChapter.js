import express from 'express';
import CurriculumChapter from '../models/CurriculumChapter.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const newChapter = new CurriculumChapter(req.body);
    const saved = await newChapter.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const chapters = await CurriculumChapter.find();
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
