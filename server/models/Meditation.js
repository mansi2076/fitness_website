import mongoose from 'mongoose';

const meditationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'stressed', 'calm', 'energetic'],
  },
  duration: {
    type: Number,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['mindfulness', 'breathing', 'visualization', 'body-scan', 'loving-kindness'],
    default: 'mindfulness',
  },
  instructor: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Meditation', meditationSchema);