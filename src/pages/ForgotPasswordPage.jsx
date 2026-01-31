import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset request logic
    };

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* 1. Header Section */}
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Reset password
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {/* 2. Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
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

                <Button className="w-full h-11 text-base font-semibold shadow-sm" type="submit">
                    Send Reset Link
                </Button>
            </form>

            {/* 3. Footer / Back to Login */}
            <div className="flex flex-col space-y-4 text-center">
                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border"></div>
                </div>
                
                <Link 
                    to="/auth/login" 
                    className="group flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to login
                </Link>
            </div>
        </div>
    );
}