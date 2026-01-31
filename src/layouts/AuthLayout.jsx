// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import { Wrench, Quote } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      {/* BRANDING SIDE */}
      <div className="relative hidden lg:flex flex-col bg-zinc-950 p-10 text-white border-r border-zinc-900">
        {/* Subtle grid pattern - keep opacity very low */}
        <div className="absolute inset-0 opacity-5 bg-[grid_zinc-800_1px,transparent_1px] [background-size:32px_32px]" />
        
        <div className="relative z-20">
          <div className="flex items-center text-xl font-bold tracking-tighter italic">
            <Wrench className="mr-2 h-5 w-5 text-muted-foreground" />
            WORKSHOP<span className="text-muted-foreground">PRO</span>
          </div>
          <Separator className="mt-4 bg-zinc-900" />
        </div>

        {/* HERO SECTION - Mathematical Center */}
        <div className="relative z-20 flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter leading-[0.9]">
              Streamline your <br />
              {/* FIX: Using text-white or text-muted-foreground so it's visible */}
              <span className="text-muted-foreground italic">Shop Floor.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-[400px] leading-relaxed">
              The precision-engineered management system built for modern workshops and high-performance teams.
            </p>
          </div>
        </div>

        {/* TESTIMONIAL - Bottom Anchored */}
        <div className="relative z-20 mt-auto">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-8 backdrop-blur-md">
            <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
            <p className="text-xl font-medium leading-snug italic text-zinc-100">
              &ldquo;The precision of this system mirrors the precision of our mechanics. The inventory and customer management is seamless.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-muted-foreground font-bold text-xs">
                AP
              </div>
              <div>
                <p className="font-bold text-zinc-100 tracking-tight">Chief Engineer</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">Apex Performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex items-center justify-center bg-background p-8 lg:p-12">
        <div className="mx-auto w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}