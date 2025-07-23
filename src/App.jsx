import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
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
        <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Added flex flex-col here */}
          <Navbar />
          
          {/* This is your main content area */}
          <main className="flex-grow"> {/* Added this wrapper */}
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
          </main>
          
          {/* This is where you add the Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;