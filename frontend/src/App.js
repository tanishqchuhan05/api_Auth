import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import UserManagement from './pages/dashboard/Users';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminMovies from './pages/dashboard/AdminMovies';
import ProtectedRoute from './routes/ProtectedRoute';
import MovieDetails from "./pages/MovieDetails";
import MovieList from "./components/MovieList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Public Movie Routes */}
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} /> 

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
