import express from 'express';
const router = express.Router();

const logicalEntities = [
  {
    name: 'Proposal',
    attributes: ['id', 'title', 'summary', 'status', 'submittedBy', 'submittedAt'],
    relatedTo: ['CommunityMember', 'AE', 'Reviewer', 'EIC']
  },
  {
    name: 'CommunityMember',
    attributes: ['id', 'name', 'email'],
    relatedTo: ['Proposal']
  },
  {
    name: 'AE',
    attributes: ['id', 'name', 'discipline'],
    relatedTo: ['Proposal', 'Reviewer', 'EIC']
  },
  {
    name: 'Reviewer',
    attributes: ['id', 'name', 'expertiseArea'],
    relatedTo: ['Proposal', 'AE']
  },
  {
    name: 'EIC',
    attributes: ['id', 'name'],
    relatedTo: ['AE', 'Proposal']
  },
  {
    name: 'CurriculumVersion',
    attributes: ['versionId', 'releasedBy', 'releaseDate', 'notes'],
    relatedTo: ['EIC']
  }
];

router.get('/entities', (req, res) => {
  res.json(logicalEntities);
});

export default router;
