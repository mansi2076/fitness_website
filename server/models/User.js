import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    min: 10,
    max: 120,
  },
  weight: {
    type: Number,
    min: 20,
    max: 500,
  },
  height: {
    type: Number,
    min: 50,
    max: 300,
  },
  goals: {
    type: [String],
    default: [],
  },
  favoriteRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  favoriteMeditations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meditation',
  }],
  favoriteWorkouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  }],
  streaks: {
    workout: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastWorkout: { type: Date },
    },
    meditation: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastMeditation: { type: Date },
    },
    water: {
      today: { type: Number, default: 0 },
      goal: { type: Number, default: 8 },
      lastUpdated: { type: Date, default: Date.now },
    },
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);