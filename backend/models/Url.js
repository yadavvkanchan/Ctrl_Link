import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  short: { type: String, required: true },
  slug: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 👇 Third argument forces collection name to be 'links'
export default mongoose.model('Url', urlSchema, 'links');
