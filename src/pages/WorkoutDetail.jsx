import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // Sample workout data
  const sampleWorkout = {
    _id: id,
    title: 'Morning Sun Salutation',
    description: 'Energize your body and mind with this classic morning sequence that combines gentle stretches with flowing movements.',
    category: 'yoga',
    difficulty: 'beginner',
    duration: 20,
    image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
    timeOfDay: 'morning',
    yogaType: 'hatha',
    targetMuscles: ['Full Body', 'Core', 'Flexibility'],
    equipment: ['Yoga Mat'],
    caloriesBurned: 150,
    exercises: [
      {
        name: 'Mountain Pose',
        duration: 60,
        sets: 1,
        reps: 'Hold',
        rest: 10,
      },
      {
        name: 'Forward Fold',
        duration: 45,
        sets: 1,
        reps: 'Hold',
        rest: 15,
      },
      {
        name: 'Half Lift',
        duration: 30,
        sets: 1,
        reps: 'Hold',
        rest: 10,
      },
      {
        name: 'Low Lunge',
        duration: 60,
        sets: 2,
        reps: 'Hold each side',
        rest: 20,
      },
      {
        name: 'Downward Dog',
        duration: 90,
        sets: 1,
        reps: 'Hold',
        rest: 15,
      },
      {
        name: 'Cobra Pose',
        duration: 45,
        sets: 1,
        reps: 'Hold',
        rest: 15,
      },
    ],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWorkout(sampleWorkout);
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    let interval;
    if (isStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0 && isStarted) {
      handleExerciseComplete();
    }
    return () => clearInterval(interval);
  }, [isStarted, timer]);

  const startWorkout = () => {
    setIsStarted(true);
    setCurrentExercise(0);
    setTimer(workout.exercises[0].duration);
    setIsResting(false);
  };

  const handleExerciseComplete = () => {
    if (isResting) {
      // Rest period complete, move to next exercise
      const nextExercise = currentExercise + 1;
      if (nextExercise < workout.exercises.length) {
        setCurrentExercise(nextExercise);
        setTimer(workout.exercises[nextExercise].duration);
        setIsResting(false);
      } else {
        // Workout complete
        setIsStarted(false);
        setCurrentExercise(0);
        alert('Workout completed! Great job! 🎉');
      }
    } else {
      // Exercise complete, start rest period
      if (currentExercise < workout.exercises.length - 1) {
        setTimer(workout.exercises[currentExercise].rest);
        setIsResting(true);
      } else {
        // Last exercise, no rest needed
        setIsStarted(false);
        setCurrentExercise(0);
        alert('Workout completed! Great job! 🎉');
      }
    }
  };

  const pauseWorkout = () => {
    setIsStarted(false);
  };

  const resumeWorkout = () => {
    setIsStarted(true);
  };

  const resetWorkout = () => {
    setIsStarted(false);
    setCurrentExercise(0);
    setTimer(0);
    setIsResting(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workout not found</h2>
          <Link to="/yoga" className="text-primary-600 hover:text-primary-700">
            ← Back to yoga studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/yoga"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Yoga Studio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-64 object-cover"
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
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{workout.title}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">{workout.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-primary-600">{workout.duration}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-secondary-600">{workout.caloriesBurned}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-accent-600 capitalize">{workout.difficulty}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600 capitalize">{workout.yogaType}</div>
                    <div className="text-sm text-gray-600">Style</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Target Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {workout.targetMuscles.map((muscle, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Equipment Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {workout.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Tutorial */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorial</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src={workout.videoUrl}
                  className="w-full h-64 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={workout.title}
                />
              </div>
            </div>
          </div>

          {/* Workout Timer and Controls */}
          <div className="space-y-6">
            {isStarted && (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {isResting ? 'Rest Time' : 'Current Exercise'}
                </h3>
                
                <div className="mb-4">
                  <div className="text-6xl font-bold text-primary-600 mb-2">
                    {formatTime(timer)}
                  </div>
                  <div className="text-lg text-gray-600">
                    {isResting ? 'Rest' : workout.exercises[currentExercise]?.name}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentExercise / workout.exercises.length) * 100)}%`
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Exercise {currentExercise + 1} of {workout.exercises.length}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={isStarted ? pauseWorkout : resumeWorkout}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    {isStarted ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={resetWorkout}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {!isStarted && (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Prepare your space and equipment, then begin your practice
                </p>
                <button
                  onClick={startWorkout}
                  className="w-full bg-primary-500 text-white py-4 rounded-lg hover:bg-primary-600 transition-colors text-lg font-semibold"
                >
                  Start Workout
                </button>
              </div>
            )}

            {/* Exercise List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exercise Sequence</h3>
              <div className="space-y-3">
                {workout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      currentExercise === index && isStarted
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exercise.duration}s • {exercise.reps}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;