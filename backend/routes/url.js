// routes/url.js
import express from 'express';
import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// ✅ POST /api/url/shorten 
router.post('/shorten', async (req, res) => {
  const { original, custom } = req.body;

  if (!original) {
    return res.status(400).json({ message: 'URL is required' });
  }

  let slug = custom?.trim() || nanoid(6);

  // Check if custom slug already exists
  const existing = await Url.findOne({ slug });
  if (existing) {
    return res.status(400).json({ message: 'Custom word already taken!' });
  }

  const short = `http://localhost:5000/${slug}`;
  const newUrl = new Url({ original, short, slug });
  await newUrl.save();

  res.json(newUrl);
});

// ✅ GET /api/url/all 
router.get('/all', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PATCH /api/url/:id
router.patch('/:id', async (req, res) => {
  try {
    const { original, custom } = req.body;
    const url = await Url.findById(req.params.id);

    if (!url) return res.status(404).json({ message: 'URL not found' });

    if (custom) {
      const existing = await Url.findOne({ slug: custom });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Custom word already taken!' });
      }

      url.slug = custom;
      url.short = `http://localhost:5000/${custom}`;
    }

    if (original) url.original = original;

    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE /api/url/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Url.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'URL not found' });
    res.json({ message: 'URL deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/url/:slug (MUST come last)
router.get('/:slug', async (req, res) => {
  try {
    const found = await Url.findOne({ slug: req.params.slug });
    if (found) {
      return res.redirect(found.original);
    } else {
      return res.status(404).send('Not Found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
