import express from 'express';
import Editor from '../../models/Editor.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newEditor = new Editor(req.body);
    const saved = await newEditor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const editors = await Editor.find();
    res.json(editors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
