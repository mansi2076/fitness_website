import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, age, weight, height, goals } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, age, weight, height, goals },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update water intake
router.put('/water', auth, async (req, res) => {
  try {
    const { glasses } = req.body;
    const today = new Date().toDateString();
    
    const user = await User.findById(req.user.id);
    const lastUpdated = user.streaks.water.lastUpdated ? 
      user.streaks.water.lastUpdated.toDateString() : null;
    
    if (lastUpdated !== today) {
      user.streaks.water.today = 0;
    }
    
    user.streaks.water.today = glasses;
    user.streaks.water.lastUpdated = new Date();
    
    await user.save();
    
    res.json({ waterIntake: user.streaks.water });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update workout streak
router.put('/workout-streak', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date();
    const lastWorkout = user.streaks.workout.lastWorkout;
    
    if (!lastWorkout || 
        new Date(lastWorkout).toDateString() !== today.toDateString()) {
      user.streaks.workout.current += 1;
      if (user.streaks.workout.current > user.streaks.workout.longest) {
        user.streaks.workout.longest = user.streaks.workout.current;
      }
      user.streaks.workout.lastWorkout = today;
      
      await user.save();
    }
    
    res.json({ workoutStreak: user.streaks.workout });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle favorite recipe
router.put('/favorite-recipe/:recipeId', auth, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findById(req.user.id);
    
    const index = user.favoriteRecipes.indexOf(recipeId);
    if (index > -1) {
      user.favoriteRecipes.splice(index, 1);
    } else {
      user.favoriteRecipes.push(recipeId);
    }
    
    await user.save();
    res.json({ favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;