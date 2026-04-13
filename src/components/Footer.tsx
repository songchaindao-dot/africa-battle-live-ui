import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/40 backdrop-blur mt-20">
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">WaveWarz Africa</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/battles/live" className="hover:text-foreground transition-colors">Live Battles</Link>
          <Link to="/battles/upcoming" className="hover:text-foreground transition-colors">Upcoming</Link>
          <Link to="/battles/results" className="hover:text-foreground transition-colors">Results</Link>
          <Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
        </div>
        <div className="text-xs text-muted-foreground">
          Powered by <span className="text-primary font-semibold">$ongChainn</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
