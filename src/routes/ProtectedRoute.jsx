import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RootBrandingSpinner from "@/components/common/RootBrandingSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated, inProgress } = useAuth();

  if (inProgress !== "none") {
    return <RootBrandingSpinner />; // or spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
