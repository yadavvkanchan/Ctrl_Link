// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.js';
import Url from './models/Url.js'; // ✅ Needed to look up slug

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// API Routes for shortening
app.use('/api/url', urlRoutes);

// ✅ Redirect route (MUST come after express.json())
app.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const found = await Url.findOne({ slug });

    if (found) {
      return res.redirect(found.original);
    } else {
      return res.status(404).send('Short URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB error:', err));
