import express from 'express';
const router = express.Router();

let curriculumList = [];

router.post('/add', (req, res) => {
  const { title, description, year } = req.body;
  const newCurriculum = {
    curriculumId: curriculumList.length + 1,
    title,
    description,
    year,
  };
  curriculumList.push(newCurriculum);
  res.json(newCurriculum);
});

router.get('/all', (req, res) => {
  res.json(curriculumList);
});

export default router;
