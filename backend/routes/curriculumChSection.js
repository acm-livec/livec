import express from 'express';
import CurriculumChSection from '../models/CurriculumChSection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sections = await CurriculumChSection.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newSection = new CurriculumChSection(req.body);
    const saved = await newSection.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
