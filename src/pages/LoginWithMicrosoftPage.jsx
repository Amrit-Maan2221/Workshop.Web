import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RootBrandingSpinner from "@/components/common/RootBrandingSpinner";

export default function LoginWithMicrosoftPage() {
  const { login } = useAuth();
  return (
    <Button className="w-full h-11" onClick={login}>
      Sign in with Microsoft
    </Button>
  );
}
