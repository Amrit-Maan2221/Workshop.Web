import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "System Malfunction";
  let message = "Something went wrong in the workshop.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Missing";
      message = "We can't find the tool or page you're looking for.";
    } else if (error.status === 500) {
      title = "Internal Server Error";
      message = "Our systems are experiencing a heavy load. Please try again.";
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      {/* Icon with shadcn destructive styling */}
      <div className="mb-6 rounded-full">
        <AlertTriangle className="h-12 w-12" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mb-8 text-muted-foreground max-w-md italic">
        "{message}"
      </p>

      <div className="flex gap-4">
        {/* Industry Standard "Go Back" using history stack */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>

        <Button 
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Debug info for developers */}
      {import.meta.env.DEV && (
        <div className="mt-12 w-full max-w-2xl text-left">
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Technical Logs:</p>
          <pre className="rounded-lg border bg-muted p-4 text-xs text-muted-foreground overflow-auto">
            {error?.statusText || error?.message || "Unknown Error"}
          </pre>
        </div>
      )}
    </div>
  );
}