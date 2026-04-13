import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Zap, Menu, X, Home, Radio, Calendar, Trophy, HelpCircle } from "lucide-react";
import wavewarzLogo from "@/assets/wavewarz-logo-2.png";
import NotificationsDropdown from "@/components/NotificationsDropdown";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Live Battles", path: "/battles/live", icon: Radio },
  { label: "Upcoming", path: "/battles/upcoming", icon: Calendar },
  { label: "Results", path: "/battles/results", icon: Trophy },
  { label: "How It Works", path: "/how-it-works", icon: HelpCircle },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={wavewarzLogo} alt="WaveWarz Africa" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <Link
              to="/host/create"
              className="hidden md:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Zap className="h-4 w-4" /> Host a Battle
            </Link>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border p-6 flex flex-col gap-2">
            <button onClick={() => setMobileOpen(false)} className="self-end p-2 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/host/create"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <Zap className="h-4 w-4" />
              Host a Battle
            </Link>
            <div className="mt-auto text-xs text-muted-foreground text-center">Connected to $ongChainn</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
