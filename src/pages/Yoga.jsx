import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Yoga = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const timeCategories = [
    { value: 'all', label: 'All Times' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' },
  ];

  const yogaTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'hatha', label: 'Hatha' },
    { value: 'vinyasa', label: 'Vinyasa' },
    { value: 'power', label: 'Power Yoga' },
    { value: 'yin', label: 'Yin' },
    { value: 'restorative', label: 'Restorative' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  // Sample yoga workouts data
  const sampleWorkouts = [
    {
      _id: '1',
      title: 'Morning Sun Salutation',
      description: 'Energize your body and mind with this classic morning sequence',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 20,
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Full Body', 'Core', 'Flexibility'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 150,
    },
    {
      _id: '2',
      title: 'Power Vinyasa Flow',
      description: 'Build strength and flexibility with this dynamic flowing sequence',
      category: 'yoga',
      difficulty: 'intermediate',
      duration: 45,
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'afternoon',
      yogaType: 'vinyasa',
      targetMuscles: ['Arms', 'Core', 'Legs'],
      equipment: ['Yoga Mat', 'Blocks'],
      caloriesBurned: 300,
    },
    {
      _id: '3',
      title: 'Evening Wind Down',
      description: 'Gentle stretches and poses to release tension and prepare for sleep',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 30,
      image: 'https://images.pexels.com/photos/3822928/pexels-photo-3822928.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'evening',
      yogaType: 'restorative',
      targetMuscles: ['Hips', 'Spine', 'Shoulders'],
      equipment: ['Yoga Mat', 'Bolster'],
      caloriesBurned: 120,
    },
    {
      _id: '4',
      title: 'Post-Meal Gentle Flow',
      description: 'Light movements to aid digestion and maintain energy',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 15,
      image: 'https://images.pexels.com/photos/3822647/pexels-photo-3822647.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'afternoon',
      yogaType: 'yin',
      targetMuscles: ['Core', 'Hips'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 80,
    },
    {
      _id: '5',
      title: 'Advanced Power Yoga',
      description: 'Challenge yourself with this intense strength-building practice',
      category: 'yoga',
      difficulty: 'advanced',
      duration: 60,
      image: 'https://images.pexels.com/photos/3823160/pexels-photo-3823160.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'morning',
      yogaType: 'power',
      targetMuscles: ['Full Body', 'Core', 'Balance'],
      equipment: ['Yoga Mat', 'Blocks', 'Strap'],
      caloriesBurned: 400,
    },
    {
      _id: '6',
      title: 'Night Time Yin Yoga',
      description: 'Deep relaxation and stress relief for better sleep',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 40,
      image: 'https://images.pexels.com/photos/3823164/pexels-photo-3823164.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'night',
      yogaType: 'yin',
      targetMuscles: ['Hips', 'Spine', 'Nervous System'],
      equipment: ['Yoga Mat', 'Bolster', 'Blanket'],
      caloriesBurned: 100,
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch from the API
    setWorkouts(sampleWorkouts);
  }, []);

  const filteredWorkouts = workouts.filter(workout => {
    return (
      (selectedTime === 'all' || workout.timeOfDay === selectedTime) &&
      (selectedType === 'all' || workout.yogaType === selectedType) &&
      (selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty)
    );
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Yoga Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover inner peace and physical strength through our comprehensive yoga practices
          </p>
        </div>

        {/* Featured Session */}
        <div className="mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Featured Today</h2>
              <h3 className="text-2xl mb-4">Morning Energizer Flow</h3>
              <p className="mb-6 text-primary-100">
                Start your day with this invigorating 30-minute sequence designed to awaken your body and mind.
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">30</div>
                  <div className="text-sm text-primary-200">minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">200</div>
                  <div className="text-sm text-primary-200">calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">★</div>
                  <div className="text-sm text-primary-200">beginner</div>
                </div>
              </div>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Session
              </button>
            </div>
            <div className="h-64 md:h-full">
              <img
                src="https://images.pexels.com/photos/3823158/pexels-photo-3823158.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Featured yoga session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Time of Day</h3>
            <div className="flex flex-wrap gap-3">
              {timeCategories.map((time) => (
                <button
                  key={time.value}
                  onClick={() => setSelectedTime(time.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTime === time.value
                      ? 'bg-primary-500 text-white transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Yoga Type</h3>
            <div className="flex flex-wrap gap-3">
              {yogaTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedType === type.value
                      ? 'bg-secondary-500 text-white transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Difficulty</h3>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.value}
                  onClick={() => setSelectedDifficulty(difficulty.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDifficulty === difficulty.value
                      ? 'bg-accent-500 text-white transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {difficulty.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Yoga Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                    {workout.duration} min
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-accent-500 text-white px-2 py-1 rounded text-sm">
                    {workout.caloriesBurned} cal
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {workout.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {workout.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="capitalize">{workout.yogaType} • {workout.timeOfDay}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {workout.targetMuscles.slice(0, 3).map((muscle, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{workout.equipment.join(', ')}</p>
                  </div>
                  <Link
                    to={`/workout/${workout._id}`}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    Start Practice
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Yoga Tips for Beginners
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Slow</h4>
              <p className="text-gray-600 text-sm">
                Begin with beginner-friendly poses and gradually build your practice
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Listen to Your Body</h4>
              <p className="text-gray-600 text-sm">
                Honor your body's limits and never force a pose
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Consistent</h4>
              <p className="text-gray-600 text-sm">
                Regular practice, even if short, brings better results than sporadic long sessions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yoga;