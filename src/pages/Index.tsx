import { Link } from "react-router-dom";
import { Zap, Play, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BattleCard from "@/components/BattleCard";
import StatsRow from "@/components/StatsRow";
import CountryChips from "@/components/CountryChips";
import SectionHeader from "@/components/SectionHeader";
import { liveBattles, upcomingBattles, endedBattles } from "@/data/mockData";
import wavewarzLogo from "@/assets/wavewarz-logo-2.png";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-battle opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <Zap className="h-3 w-3" /> WaveWarz Africa
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-foreground leading-tight mb-6">
            Prepare For The Next Music Battle Wave{" "}
            <span className="text-primary text-glow-green">Across Africa</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Compete. Vote. Host. Discover the hottest artists across Africa in real-time live battle rooms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/battles/live" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_25px_hsl(var(--neon-green)/0.3)]">
              <Play className="h-4 w-4" /> Join Live Battle
            </Link>
            <Link to="/host/create" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-bold text-foreground hover:bg-muted transition-colors">
              <Zap className="h-4 w-4" /> Host a Battle
            </Link>
            <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-muted-foreground hover:bg-muted transition-colors">
              <HelpCircle className="h-4 w-4" /> How It Works
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0">
          <img src={wavewarzLogo} alt="WaveWarz Africa" className="w-64 md:w-80 float-slow" />
        </div>
      </div>
    </section>

    <div className="mx-auto max-w-7xl px-4 space-y-16">
      {/* Stats */}
      <StatsRow />

      {/* Countries */}
      <CountryChips />

      {/* Live Battles */}
      <section>
        <SectionHeader title="🔴 Live Now" subtitle="Jump into a battle happening right now" linkTo="/battles/live" linkLabel="All Live" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveBattles.map((b) => <BattleCard key={b.id} battle={b} />)}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <SectionHeader title="📅 Upcoming" subtitle="Battles coming soon" linkTo="/battles/upcoming" linkLabel="All Upcoming" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingBattles.map((b) => <BattleCard key={b.id} battle={b} />)}
        </div>
      </section>

      {/* Results */}
      <section>
        <SectionHeader title="🏆 Recent Results" subtitle="See who came out on top" linkTo="/battles/results" linkLabel="All Results" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {endedBattles.map((b) => <BattleCard key={b.id} battle={b} />)}
        </div>
      </section>

      {/* Host CTA */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-10 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">Ready to Host?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Create your own battle room, invite artists, and let Africa decide who wins.
        </p>
        <Link to="/host/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_25px_hsl(var(--neon-green)/0.3)]">
          <Zap className="h-4 w-4" /> Host a Battle
        </Link>
      </section>
    </div>

    <Footer />
  </div>
);

export default Index;
