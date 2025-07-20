import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user, fetchUser } = useAuth();
  const [waterIntake, setWaterIntake] = useState(0);
  const [workoutStreak, setWorkoutStreak] = useState({ current: 0, longest: 0 });
  const [bmi, setBmi] = useState(0);
  const [calories, setCalories] = useState(0);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMeditations: 0,
    favoriteRecipes: 0,
  });

  useEffect(() => {
    if (user) {
      calculateBMI();
      calculateCalories();
      setWaterIntake(user.streaks?.water?.today || 0);
      setWorkoutStreak(user.streaks?.workout || { current: 0, longest: 0 });
      setStats({
        totalWorkouts: user.favoriteWorkouts?.length || 0,
        totalMeditations: user.favoriteMeditations?.length || 0,
        favoriteRecipes: user.favoriteRecipes?.length || 0,
      });
    }
  }, [user]);

  const calculateBMI = () => {
    if (user?.weight && user?.height) {
      const heightInMeters = user.height / 100;
      const bmiValue = user.weight / (heightInMeters * heightInMeters);
      setBmi(Math.round(bmiValue * 10) / 10);
    }
  };

  const calculateCalories = () => {
    if (user?.weight && user?.height && user?.age) {
      // Mifflin-St Jeor Equation for BMR
      const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5; // For males
      const dailyCalories = Math.round(bmr * 1.55); // Moderate activity level
      setCalories(dailyCalories);
    }
  };

  const updateWaterIntake = async (glasses) => {
    try {
      await axios.put('/api/users/water', { glasses });
      setWaterIntake(glasses);
    } catch (error) {
      console.error('Error updating water intake:', error);
    }
  };

  const completeWorkout = async () => {
    try {
      const response = await axios.put('/api/users/workout-streak');
      setWorkoutStreak(response.data.workoutStreak);
      fetchUser();
    } catch (error) {
      console.error('Error updating workout streak:', error);
    }
  };

  const waterData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [waterIntake, Math.max(0, 8 - waterIntake)],
        backgroundColor: ['#0284c7', '#e5e7eb'],
        borderWidth: 0,
      },
    ],
  };

  const progressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workout Minutes',
        data: [45, 30, 60, 0, 40, 55, 35],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Meditation Minutes',
        data: [15, 20, 10, 25, 15, 30, 20],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmiValue < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmiValue < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  if (!user) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <Link to="/login" className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's your wellness overview for today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workout Streak</p>
                <p className="text-3xl font-bold text-primary-600">{workoutStreak.current}</p>
                <p className="text-xs text-gray-500">Best: {workoutStreak.longest} days</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">BMI</p>
                <p className="text-3xl font-bold text-secondary-600">{bmi}</p>
                <p className={`text-xs ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).category}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Calories</p>
                <p className="text-3xl font-bold text-accent-600">{calories}</p>
                <p className="text-xs text-gray-500">Recommended intake</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-1m3 1l3-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-3xl font-bold text-green-600">{stats.favoriteRecipes}</p>
                <p className="text-xs text-gray-500">Saved recipes</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Water Tracker */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Intake</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32">
                <Doughnut 
                  data={waterData} 
                  options={{
                    cutout: '70%',
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-secondary-600">{waterIntake}/8</p>
              <p className="text-sm text-gray-600">glasses today</p>
            </div>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => updateWaterIntake(Math.max(0, waterIntake - 1))}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <button
                onClick={() => updateWaterIntake(Math.min(12, waterIntake + 1))}
                className="bg-secondary-500 text-white px-3 py-1 rounded-lg hover:bg-secondary-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={completeWorkout}
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Complete Workout
              </button>
              <Link
                to="/meditation"
                className="block w-full bg-secondary-500 text-white py-3 rounded-lg hover:bg-secondary-600 transition-colors text-center"
              >
                Start Meditation
              </Link>
              <Link
                to="/yoga"
                className="block w-full bg-accent-500 text-white py-3 rounded-lg hover:bg-accent-600 transition-colors text-center"
              >
                Begin Yoga Session
              </Link>
              <Link
                to="/diet"
                className="block w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-center"
              >
                Browse Recipes
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Morning Yoga</p>
                  <p className="text-xs text-gray-600">30 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Mindfulness Meditation</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Healthy Smoothie Recipe</p>
                  <p className="text-xs text-gray-600">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <div className="h-64">
            <Line 
              data={progressData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;