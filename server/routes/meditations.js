import express from 'express';
import Meditation from '../models/Meditation.js';

const router = express.Router();

// Get all meditations
router.get('/', async (req, res) => {
  try {
    const { mood, category } = req.query;
    let query = {};
    
    if (mood && mood !== 'all') {
      query.mood = mood;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const meditations = await Meditation.find(query).sort({ createdAt: -1 });
    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single meditation
router.get('/:id', async (req, res) => {
  try {
    const meditation = await Meditation.findById(req.params.id);
    
    if (!meditation) {
      return res.status(404).json({ message: 'Meditation not found' });
    }
    
    res.json(meditation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;