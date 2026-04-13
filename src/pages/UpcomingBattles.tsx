import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BattleCard from "@/components/BattleCard";
import { upcomingBattles } from "@/data/mockData";

const UpcomingBattles = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-display font-black text-foreground mb-2">📅 Upcoming Battles</h1>
        <p className="text-muted-foreground">Battles scheduled and ready to go</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingBattles.map((b) => <BattleCard key={b.id} battle={b} />)}
      </div>
    </div>
    <Footer />
  </div>
);

export default UpcomingBattles;
