import mongoose from 'mongoose';

const curriculumChapterSchema = new mongoose.Schema({
  chapterTitle: { type: String, required: true },
  chapterDescription: { type: String },
  chapterNumber: { type: Number, required: true },
  curriculumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum', required: true },
});

export default mongoose.model('CurriculumChapter', curriculumChapterSchema);
