import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BattleCard from "@/components/BattleCard";
import { endedBattles } from "@/data/mockData";

const Results = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-display font-black text-foreground mb-2">🏆 Battle Results</h1>
        <p className="text-muted-foreground">See who came out on top</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {endedBattles.map((b) => <BattleCard key={b.id} battle={b} />)}
      </div>
    </div>
    <Footer />
  </div>
);

export default Results;
