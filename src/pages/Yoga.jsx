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
    { value: 'ashtanga', label: 'Ashtanga' },
    { value: 'iyengar', label: 'Iyengar' },
    { value: 'kundalini', label: 'Kundalini' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  // Updated with authentic yoga practices
  const sampleWorkouts = [
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
      videoUrl: 'https://www.youtube.com/embed/4vTJHUDB5ak',
      timeOfDay: 'morning',
      yogaType: 'vinyasa',
      targetMuscles: ['Arms', 'Core', 'Legs'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 300,
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
      videoUrl: 'https://www.youtube.com/embed/2MJGg-dUKh0',
      timeOfDay: 'evening',
      yogaType: 'restorative',
      targetMuscles: ['Hips', 'Thighs', 'Back'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 20,
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
      videoUrl: 'https://www.youtube.com/embed/0dK1lz3J9W8',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Core', 'Spine'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 30,
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
      videoUrl: 'https://www.youtube.com/embed/Xi--eXXQYqY',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Hamstrings', 'Shoulders', 'Arms'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 40,
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
      videoUrl: 'https://www.youtube.com/embed/4WQOqHX5X2U',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Hips', 'Shoulders'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 50,
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
      videoUrl: 'https://www.youtube.com/embed/fOdrW7nf9gw',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Back', 'Chest', 'Shoulders'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 30,
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
      videoUrl: 'https://www.youtube.com/embed/8lyQimR0k5A',
      timeOfDay: 'night',
      yogaType: 'restorative',
      targetMuscles: ['Full Body Relaxation'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 10,
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
      videoUrl: 'https://www.youtube.com/embed/S6D4Jc0vF5I',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Legs', 'Hips', 'Side Body'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 40,
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
      videoUrl: 'https://www.youtube.com/embed/6oxScpLByvA',
      timeOfDay: 'morning',
      yogaType: 'ashtanga',
      targetMuscles: ['Shoulders', 'Arms', 'Core'],
      equipment: ['Yoga Mat', 'Wall Support'],
      caloriesBurned: 60,
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
      videoUrl: 'https://www.youtube.com/embed/b8UFi9QlH8I',
      timeOfDay: 'evening',
      yogaType: 'hatha',
      targetMuscles: ['Hips', 'Knees', 'Ankles'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 20,
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
      videoUrl: 'https://www.youtube.com/embed/J7KODSXWgtw',
      timeOfDay: 'morning',
      yogaType: 'hatha',
      targetMuscles: ['Back', 'Shoulders', 'Chest'],
      equipment: ['Yoga Mat'],
      caloriesBurned: 50,
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
    {/* Left Side - Updated Content */}
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Why Practice Yoga?</h2>
      <h3 className="text-2xl mb-4">Balance, Flexibility & Peace of Mind</h3>
      <p className="mb-6 text-primary-100">
        Yoga is more than just physical movement — it’s a way to harmonize your mind, body, and spirit.
        Through mindful breathing, posture, and meditation, yoga helps reduce stress, improve flexibility,
        and build inner strength. Whether you're just starting or deep in your practice, each session brings
        calm and clarity to your daily life.
      </p>
      <div className="flex items-center space-x-6 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold">10+</div>
          <div className="text-sm text-primary-200">styles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">365</div>
          <div className="text-sm text-primary-200">days wellness</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">∞</div>
          <div className="text-sm text-primary-200">inner peace</div>
        </div>
      </div>
      
    </div>

    {/* Right Side - Image remains unchanged */}
    <div className="h-64 md:h-full">
      <img
        src="https://www.guardian.in/cdn/shop/articles/yoga-asans-for-weight-loss.jpg?v=1705486602"
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
                {workout.hindiName && (
                  <p className="text-gray-500 text-sm mb-1">{workout.hindiName}</p>
                )}
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