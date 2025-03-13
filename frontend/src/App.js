import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import UserManagement from './pages/dashboard/Users';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminMovies from './pages/dashboard/AdminMovies';  // ✅ Import the AdminMovies component
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/admindashboard" element={<ProtectedRoute role="superAdmin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/userdashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/admin/getalluser" element={<ProtectedRoute role="superAdmin"><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/movies" element={<ProtectedRoute role="superAdmin"><AdminMovies /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
}

export default App;
