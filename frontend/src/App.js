import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/dashboard/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/signup" element = {<Signup/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )}

export default App;
