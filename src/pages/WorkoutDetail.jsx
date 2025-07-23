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

  // Complete list of yoga workouts matching your yoga page
  const yogaWorkouts = [
    {
      _id: '1',
      title: 'Surya Namaskar (Sun Salutation)',
      hindiName: 'सूर्य नमस्कार',
      description: 'A sequence of 12 powerful yoga poses that provide a great cardiovascular workout',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 15,
      image: 'https://assets.gqindia.com/photos/5d0b8563154641deba5969e3/16:9/w_2560%2Cc_limit/International%2520Yoga%2520Day-All%2520the%2520health%2520benefits%2520of%2520Surya%2520Namaskar.jpg',
      videoUrl: 'https://youtu.be/YAq_oCjnkWY?si=owxqII57wFlXNPq6',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Full Body', 'Core', 'Flexibility'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 150,
      exercises: [
        {
          name: 'Pranamasana (Prayer Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Hasta Uttanasana (Raised Arms Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Uttanasana (Standing Forward Bend)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Ashwa Sanchalanasana (Equestrian Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold each side',
          rest: 10,
        },
        {
          name: 'Adho Mukha Svanasana (Downward Dog)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Ashtanga Namaskara (Eight-Limbed Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Bhujangasana (Cobra Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
      ],
    },
    {
      _id: '2',
      title: 'Vinyasa Flow',
      hindiName: 'विन्यास योग',
      description: 'Dynamic sequence of poses synchronized with breath to build heat and endurance',
      category: 'yoga',
      difficulty: 'intermediate',
      duration: 45,
      image: 'https://poweryogacanada.com/wp-content/uploads/2021/12/200TT-068.jpg',
      videoUrl: 'https://youtu.be/GIITzjtk_f8?si=-5wUSm2sPXHhyOrP',
      timeOfDay: 'morning',
      yogaType: 'vinyasa',
      targetMuscles: ['Arms', 'Core', 'Legs'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 300,
      exercises: [
        {
          name: 'Tadasana (Mountain Pose)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Uttanasana (Forward Fold)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Ardha Uttanasana (Half Lift)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Adho Mukha Svanasana (Downward Dog)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Phalakasana (Plank Pose)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Chaturanga Dandasana (Four-Limbed Staff Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
      ],
    },
    {
      _id: '3',
      title: 'Balasana (Child\'s Pose)',
      hindiName: 'बालासन',
      description: 'Gentle resting pose that calms the mind and relieves stress and fatigue',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 5,
      image: 'https://images.healthshots.com/healthshots/en/uploads/2023/11/13110400/balasana-1.jpg',
      videoUrl: 'https://youtu.be/2MJGg-dUKh0?si=jQK_A70OuydHt1qG',
      timeOfDay: 'evening',
      yogaType: 'restorative',
      targetMuscles: ['Hips', 'Thighs', 'Back'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 20,
      exercises: [
        {
          name: 'Balasana (Child\'s Pose)',
          duration: 300,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '4',
      title: 'Tadasana (Mountain Pose)',
      hindiName: 'ताड़ासन',
      description: 'Foundation of all standing poses, improves posture and balance',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 5,
      image: 'https://artimg.gympik.com/articles/wp-content/uploads/2017/08/Tadasana-Yoga-for-Glowing-Skin1.png',
      videoUrl: 'https://youtu.be/rPJJIacKWsk?si=-e36H1QiXRcSCLsp',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Core', 'Spine'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 30,
      exercises: [
        {
          name: 'Tadasana (Mountain Pose)',
          duration: 300,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '5',
      title: 'Adho Mukha Svanasana (Downward Dog)',
      hindiName: 'अधो मुख श्वानासन',
      description: 'Inversion pose that stretches and strengthens the entire body',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 5,
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*tE3y72ROkd3B2X-T_5xNJg.png',
      videoUrl: 'https://youtu.be/EC7RGJ975iM?si=Xo-gBpb2ShhavLWi',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Hamstrings', 'Shoulders', 'Arms'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 40,
      exercises: [
        {
          name: 'Adho Mukha Svanasana (Downward Dog)',
          duration: 300,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '6',
      title: 'Virabhadrasana II (Warrior II)',
      hindiName: 'वीरभद्रासन II',
      description: 'Powerful standing pose that builds stamina and concentration',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 5,
      image: 'https://www.gaia.com/wp-content/uploads/WarriorII_ColleenSaidman.jpg',
      videoUrl: 'https://youtu.be/4Ejz7IgODlU?si=UA8iqPdRKb0GDNoo',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Hips', 'Shoulders'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 50,
      exercises: [
        {
          name: 'Virabhadrasana II (Warrior II)',
          duration: 300,
          sets: 1,
          reps: 'Hold each side',
          rest: 30,
        },
      ],
    },
    {
      _id: '7',
      title: 'Bhujangasana (Cobra Pose)',
      hindiName: 'भुजंगासन',
      description: 'Gentle backbend that strengthens the spine and opens the chest',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 5,
      image: 'https://rishikeshashtangayogaschool.com/blog/wp-content/uploads/2021/11/cobra-pose_11zon.jpg',
      videoUrl: 'https://youtu.be/fOdrW7nf9gw?si=v8Wuur4tFUtDZKWn',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Back', 'Chest', 'Shoulders'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 30,
      exercises: [
        {
          name: 'Bhujangasana (Cobra Pose)',
          duration: 300,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '8',
      title: 'Savasana (Corpse Pose)',
      hindiName: 'शवासन',
      description: 'Final relaxation pose that allows the body to absorb benefits of practice',
      category: 'yoga',
      difficulty: 'beginner',
      duration: 10,
      image: 'https://wp.insighttimer.com/blog/wp-content/uploads/2020/02/savasana-in-yoga.jpg',
      videoUrl: 'https://youtu.be/1VYlOKUdylM?si=2ZeZ9MnlItBk2rqI',
      timeOfDay: 'night',
      yogaType: 'restorative',
      targetMuscles: ['Full Body Relaxation'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 10,
      exercises: [
        {
          name: 'Savasana (Corpse Pose)',
          duration: 600,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '9',
      title: 'Trikonasana (Triangle Pose)',
      hindiName: 'त्रिकोणासन',
      description: 'Standing pose that improves balance and stretches the sides of the body',
      category: 'yoga',
      difficulty: 'intermediate',
      duration: 5,
      image: 'https://vinyasayogaacademy.com/blog/wp-content/uploads/2020/03/triangle-pose.jpg',
      videoUrl: 'https://youtu.be/S6gB0QHbWFE?si=ooQK8sWxpdfyBr8F',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Hips', 'Side Body'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 40,
      exercises: [
        {
          name: 'Trikonasana (Triangle Pose)',
          duration: 300,
          sets: 1,
          reps: 'Hold each side',
          rest: 30,
        },
      ],
    },
    {
      _id: '10',
      title: 'Sirsasana (Headstand)',
      hindiName: 'शीर्षासन',
      description: 'Advanced inversion that improves circulation and focus',
      category: 'yoga',
      difficulty: 'advanced',
      duration: 5,
      image: 'https://zuda.b-cdn.net/wp-content/uploads/2023/01/Salamba-Sirsasana.png',
      videoUrl: 'https://youtu.be/VrenTA2IFjI?si=DhpY6rbNXMC_3rsW',
      timeOfDay: 'morning',
      yogaType: 'ashtanga',
      targetMuscles: ['Shoulders', 'Arms', 'Core'],
      equipment: ['Yoga Mat', 'Wall Support'],
      caloriesBurned: 60,
      exercises: [
        {
          name: 'Sirsasana (Headstand)',
          duration: 300,
          sets: 1,
          reps: 'Hold',
          rest: 0,
        },
      ],
    },
    {
      _id: '11',
      title: 'Padmasana (Lotus Pose)',
      hindiName: 'पद्मासन',
      description: 'Classic meditation pose that promotes calmness and focus',
      category: 'yoga',
      difficulty: 'intermediate',
      duration: 10,
      image: 'https://www.yogateket.com/image/original/Padmasana_lotus.jpg',
      videoUrl: 'https://youtu.be/VPG3L4KNff4?si=-iOI-wGGZ5OdXnDV',
      timeOfDay: 'evening',
      yogaType: 'hatha',
      targetMuscles: ['Hips', 'Knees', 'Ankles'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 20,
      exercises: [
        {
          name: 'Tadasana (Mountain Pose)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Uttanasana (Forward Fold)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Ardha Uttanasana (Half Lift)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Adho Mukha Svanasana (Downward Dog)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Phalakasana (Plank Pose)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Chaturanga Dandasana (Four-Limbed Staff Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
      ],
    },
    {
      _id: '12',
      title: 'Dhanurasana (Bow Pose)',
      hindiName: 'धनुरासन',
      description: 'Backbend that strengthens the back and opens the chest',
      category: 'yoga',
      difficulty: 'intermediate',
      duration: 5,
      image: 'https://www.vinyasayogaashram.com/blog/wp-content/uploads/2021/04/dhanurasana.jpg',
      videoUrl: 'https://youtu.be/c6CgFt4onGk?si=iC9LeS056-8rEsSN',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Back', 'Shoulders', 'Chest'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 50,
      exercises: [
        {
          name: 'Tadasana (Mountain Pose)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Uttanasana (Forward Fold)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Ardha Uttanasana (Half Lift)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 10,
        },
        {
          name: 'Adho Mukha Svanasana (Downward Dog)',
          duration: 60,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Phalakasana (Plank Pose)',
          duration: 45,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
        {
          name: 'Chaturanga Dandasana (Four-Limbed Staff Pose)',
          duration: 30,
          sets: 1,
          reps: 'Hold',
          rest: 15,
        },
      ],

    },
  ];

  useEffect(() => {
    // Find the workout by ID from the sample data
    const foundWorkout = yogaWorkouts.find(w => w._id === id);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (foundWorkout) {
        setWorkout(foundWorkout);
      }
      setLoading(false);
    }, 500);
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

  // Function to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // If already an embed URL, return as is
    if (url.includes('embed')) return url;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
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
                {workout.hindiName && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm">
                    {workout.hindiName}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{workout.title}</h1>
                {workout.hindiName && (
                  <p className="text-gray-500 text-lg mb-2">{workout.hindiName}</p>
                )}
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
                  src={getEmbedUrl(workout.videoUrl)}
                  className="w-full h-96 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={workout.title}
                />
              </div>
            </div>
          </div>

          {/* Workout Timer and Controls - UNCHANGED FROM ORIGINAL */}
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
                  {!isResting && workout.exercises[currentExercise]?.reps && (
                    <div className="text-sm text-gray-500 mt-1">
                      {workout.exercises[currentExercise].reps}
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentExercise + (isResting ? 0.5 : 0)) / workout.exercises.length) * 100}%`
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
                          {formatTime(exercise.duration)} • {exercise.reps}
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