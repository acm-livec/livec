import mongoose from 'mongoose';

const editorSchema = new mongoose.Schema({
  EID: { type: String, required: true, unique: true },
  EFirstName: { type: String, required: true },
  ELastName: { type: String, required: true },
  EEmail: { type: String, required: true, unique: true },
  ERole: { type: String, enum: ['AE', 'EIC'], required: true }
});

export default mongoose.model('Editor', editorSchema);
