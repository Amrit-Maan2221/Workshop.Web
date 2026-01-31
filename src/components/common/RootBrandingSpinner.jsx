import { Settings, Loader2 } from "lucide-react";

export default function RootBrandingSpinner() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Workshop Icon with Mechanical Animation */}
        <div className="relative flex items-center justify-center">
          <Settings className="h-12 w-12 text-primary animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="h-4 w-4 rounded-full bg-background border-2 border-primary" />
          </div>
        </div>

        {/* Branding Text */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black tracking-tight uppercase italic">
            Workshop<span className="text-primary">Pro</span>
          </h1>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Management System
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
              Syncing Tools & Data
            </span>
          </div>
        </div>

      </div>
      
      {/* Bottom version info - Standard for Industrial Apps */}
      <div className="absolute bottom-8 text-[10px] text-muted-foreground/50 font-mono">
        v1.0.4-stable
      </div>
    </div>
  );
}