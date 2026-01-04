import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedRoute from "./components/authenticatedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/login"
              element={
                <AuthenticatedRoute>
                  <Login />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthenticatedRoute>
                  <Register />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
