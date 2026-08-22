import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige vers la page de login en gardant l'URL actuelle pour revenir après
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
