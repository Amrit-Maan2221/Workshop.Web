import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RootBrandingSpinner from "@/components/common/RootBrandingSpinner";

export default function PublicRoute() {
  const { isAuthenticated, inProgress } = useAuth();

  // Wait until MSAL finishes redirect handling
  if (inProgress !== "none") {
    return <RootBrandingSpinner />; // or spinner
  }

  // If logged in → go home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow auth pages
  return <Outlet />;
}
