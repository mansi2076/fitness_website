import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'yoga', 'flexibility', 'hiit'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  duration: {
    type: Number,
    required: true,
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: String,
    duration: Number,
    rest: Number,
  }],
  image: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  targetMuscles: [{
    type: String,
  }],
  equipment: [{
    type: String,
  }],
  caloriesBurned: {
    type: Number,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Workout', workoutSchema);