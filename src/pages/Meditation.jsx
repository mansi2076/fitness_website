import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Meditation = () => {
  const [meditations, setMeditations] = useState([]);
  const [selectedMood, setSelectedMood] = useState('all');
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const moods = [
    { value: 'all', label: 'All Moods', color: 'bg-gray-500' },
    { value: 'happy', label: 'Happy', color: 'bg-yellow-500' },
    { value: 'sad', label: 'Sad', color: 'bg-blue-500' },
    { value: 'angry', label: 'Angry', color: 'bg-red-500' },
    { value: 'stressed', label: 'Stressed', color: 'bg-purple-500' },
    { value: 'calm', label: 'Calm', color: 'bg-green-500' },
    { value: 'energetic', label: 'Energetic', color: 'bg-orange-500' },
  ];

  // Sample meditation data
  const sampleMeditations = [
    {
      _id: '1',
      title: 'Morning Mindfulness',
      description: 'Start your day with clarity and purpose through this gentle morning meditation.',
      mood: 'calm',
      duration: 10,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'mindfulness',
      instructor: 'Sarah Mitchell',
    },
    {
      _id: '2',
      title: 'Stress Relief Breathing',
      description: 'Release tension and anxiety with focused breathing techniques.',
      mood: 'stressed',
      duration: 15,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'breathing',
      instructor: 'Michael Chen',
    },
    {
      _id: '3',
      title: 'Joyful Energy',
      description: 'Cultivate positive emotions and boost your mood with this uplifting session.',
      mood: 'happy',
      duration: 12,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'visualization',
      instructor: 'Emma Rodriguez',
    },
    {
      _id: '4',
      title: 'Healing Sadness',
      description: 'Find comfort and peace during difficult times with gentle guided meditation.',
      mood: 'sad',
      duration: 20,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'loving-kindness',
      instructor: 'David Kumar',
    },
    {
      _id: '5',
      title: 'Anger Release',
      description: 'Transform anger into understanding and inner peace through mindful awareness.',
      mood: 'angry',
      duration: 18,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'mindfulness',
      instructor: 'Lisa Thompson',
    },
    {
      _id: '6',
      title: 'Energy Boost',
      description: 'Revitalize your mind and body with this energizing meditation practice.',
      mood: 'energetic',
      duration: 8,
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      image: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      category: 'visualization',
      instructor: 'Alex Park',
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch from the API
    // fetchMeditations();
    setMeditations(sampleMeditations);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentMeditation]);

  const fetchMeditations = async () => {
    try {
      const response = await axios.get('/api/meditations', {
        params: { mood: selectedMood },
      });
      setMeditations(response.data);
    } catch (error) {
      console.error('Error fetching meditations:', error);
    }
  };

  const filteredMeditations = selectedMood === 'all' 
    ? meditations 
    : meditations.filter(m => m.mood === selectedMood);

  const playMeditation = (meditation) => {
    if (currentMeditation?._id === meditation._id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentMeditation(meditation);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meditation & Mindfulness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find peace and clarity through guided meditation sessions tailored to your current mood
          </p>
        </div>

        {/* Mood Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedMood === mood.value
                    ? `${mood.color} text-white transform scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meditation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredMeditations.map((meditation) => (
            <div
              key={meditation._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={meditation.image}
                  alt={meditation.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => playMeditation(meditation)}
                    className="bg-white bg-opacity-90 rounded-full p-4 transform hover:scale-110 transition-transform duration-200"
                  >
                    {currentMeditation?._id === meditation._id && isPlaying ? (
                      <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    moods.find(m => m.value === meditation.mood)?.color || 'bg-gray-500'
                  }`}>
                    {meditation.mood}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                    {meditation.duration} min
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {meditation.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {meditation.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p className="font-medium">{meditation.instructor}</p>
                    <p className="capitalize">{meditation.category}</p>
                  </div>
                  <button
                    onClick={() => playMeditation(meditation)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentMeditation?._id === meditation._id && isPlaying
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {currentMeditation?._id === meditation._id && isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        {currentMeditation && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentMeditation.image}
                  alt={currentMeditation.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{currentMeditation.title}</h4>
                  <p className="text-sm text-gray-600">{currentMeditation.instructor}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {formatTime(currentTime)} / {formatTime(duration || currentMeditation.duration * 60)}
                  </span>
                  <button
                    onClick={() => playMeditation(currentMeditation)}
                    className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <audio
              ref={audioRef}
              src={currentMeditation.audioUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Meditation;