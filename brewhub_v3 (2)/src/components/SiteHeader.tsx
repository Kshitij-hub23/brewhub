import { Link } from "@tanstack/react-router";
import { Coffee, Shield } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg sm:text-xl">
          <Coffee className="h-6 w-6 text-accent" />
          <span>Brew<span className="text-accent">Hub</span></span>
        </Link>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Shield className="h-4 w-4" /> <span className="hidden sm:inline">Admin</span>
        </Link>
      </div>
    </header>
  );
}
