import mongoose from 'mongoose';

const CurriculumChSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CurriculumChapter', required: true },
  content: { type: String },
});

export default mongoose.model('CurriculumChSection', CurriculumChSectionSchema);
