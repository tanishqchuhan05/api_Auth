import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import appRoutes from "./utils/appRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        {appRoutes.map(({ path, element, isProtected, role }, index) => (
          isProtected ? (
            <Route key={index} path={path} element={<ProtectedRoute role={role}>{element}</ProtectedRoute>} />
          ) : (
            <Route key={index} path={path} element={element} />
          )
        ))}
      </Routes>
    </Router>
  );
}

export default App;
