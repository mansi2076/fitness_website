import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Meditation from './pages/Meditation';
import Yoga from './pages/Yoga';
import Diet from './pages/Diet';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetail from './pages/RecipeDetail';
import WorkoutDetail from './pages/WorkoutDetail';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/workout/:id" element={<WorkoutDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;