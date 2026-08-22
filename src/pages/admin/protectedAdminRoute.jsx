import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtetedAdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-sky-600" />
      </div>
    );
  }

  // "ADMIN" est la valeur stockée en base (TextChoices value), pas le label "Admin"
  const isAdmin = user?.role === "ADMIN" || user?.is_staff === true;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtetedAdminRoute;

