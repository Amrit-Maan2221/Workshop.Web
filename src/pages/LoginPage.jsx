import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

export default function LoginPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* 1. Header Section */}
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Login to your account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your credentials to access the shop floor dashboard
                </p>
            </div>

            {/* 2. Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-foreground/90">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@workshop.com"
                            required
                            className="h-11 bg-background"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            {/* FIXED LINE BELOW: added className="" */}
                            <Label htmlFor="password" className="text-foreground/90">Password</Label>
                            <Link
                                to="/auth/forgot-password"
                                className="text-xs font-medium text-primary hover:underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required className="h-11 bg-background" />
                    </div>
                </div>

                {/* 3. Terms & Conditions */}
                <div className="text-center px-2">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        By signing in, you acknowledge our{" "}
                        <a
                            href="https://your-external-link.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                            Terms of Service
                        </a>
                        {" "}and{" "}
                        <a
                            href="https://your-external-link.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                            Privacy Policy
                        </a>.
                    </p>
                </div>

                <Button className="w-full h-11 text-base font-semibold shadow-sm" type="submit">
                    Sign In
                </Button>
            </form>

            {/* 4. Footer Section */}
            <div className="flex flex-col space-y-4 text-center">
                <SeparatorIsh text="OR" />

                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground italic">
                        New to WorkshopPro software?
                    </p>
                    <Button
                        variant="outline"
                        className="w-full h-11 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
                        asChild
                    >
                        <a
                            href="https://your-external-site.com/book-trial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold flex items-center justify-center gap-2"
                        >
                            Book a free trial for your shop
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SeparatorIsh({ text }) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-border"></div>
      <span className="flex-shrink mx-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        {text}
      </span>
      <div className="flex-grow border-t border-border"></div>
    </div>
  );
}