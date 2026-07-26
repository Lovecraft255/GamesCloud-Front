import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {

    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
