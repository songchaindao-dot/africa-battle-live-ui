import { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Zap, Save, X, Search, UserPlus, ChevronDown, Music, MapPin, Calendar, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const regions = ["Zambia", "South Africa", "Nigeria", "Zimbabwe", "Botswana"];

interface SongchainArtist {
  id: string;
  name: string;
  image: string;
  region: string;
  songs: string[];
}

interface SongchainUser {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

const SelectWrapper = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    {children}
    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

const HostCreate = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [form, setForm] = useState({
    title: "",
    region: "Zambia",
    artistA: "",
    artistB: "",
    songA: "",
    songB: "",
    schedule: "",
    notes: "",
  });
  const [coHostSearch, setCoHostSearch] = useState("");
  const [selectedCoHosts, setSelectedCoHosts] = useState<SongchainUser[]>([]);
  const [showCoHostDropdown, setShowCoHostDropdown] = useState(false);
  const [users, setUsers] = useState<SongchainUser[]>([]);
  
  // For now, artists come from battles already in system - in future this would be a separate artists table
  // Using mock artist data as placeholder since songchainn artist data structure isn't in the DB yet
  const [artists] = useState<SongchainArtist[]>([]);

  // Fetch songchainn users for co-host search
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("audience_profiles")
        .select("id, user_id, username, display_name, avatar_url")
        .eq("onboarding_completed", true)
        .not("user_id", "is", null)
        .limit(50);
      if (data) setUsers(data as SongchainUser[]);
    };
    fetchUsers();
  }, []);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const artistAObj = artists.find((a) => a.id === form.artistA);
  const artistBObj = artists.find((a) => a.id === form.artistB);

  const filteredUsers = useMemo(() => {
    if (!coHostSearch.trim()) return users.filter(u => !selectedCoHosts.find(s => s.id === u.id));
    return users.filter(
      (u) =>
        !selectedCoHosts.find((s) => s.id === u.id) &&
        ((u.username?.toLowerCase().includes(coHostSearch.toLowerCase())) ||
          (u.display_name?.toLowerCase().includes(coHostSearch.toLowerCase())))
    );
  }, [coHostSearch, selectedCoHosts, users]);

  const addCoHost = (u: SongchainUser) => {
    if (selectedCoHosts.length >= 4) return;
    setSelectedCoHosts((prev) => [...prev, u]);
    setCoHostSearch("");
    setShowCoHostDropdown(false);
  };

  const removeCoHost = (userId: string) => {
    setSelectedCoHosts((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSubmit = async () => {
    if (!user || !profile) return;
    
    const { data, error } = await supabase.from("battles").insert({
      title: form.title,
      region: form.region,
      artist_a_name: artistAObj?.name || form.artistA || "TBD",
      artist_b_name: artistBObj?.name || form.artistB || "TBD",
      artist_a_image: artistAObj?.image || null,
      artist_b_image: artistBObj?.image || null,
      song_a: form.songA || "TBD",
      song_b: form.songB || "TBD",
      host_user_id: user.id,
      host_name: profile.display_name || profile.username || "Host",
      co_hosts: selectedCoHosts.map(c => c.display_name || c.username || ""),
      scheduled_time: form.schedule || null,
      status: form.schedule ? "upcoming" : "live",
      total_rounds: 3,
    }).select().single();

    if (!error && data) {
      navigate(`/room/${data.id}`);
    }
  };

  const selectClass = "w-full rounded-xl border border-border bg-card/80 backdrop-blur pl-14 pr-4 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-all appearance-none cursor-pointer hover:border-primary/20";
  const inputClass = "w-full rounded-xl border border-border bg-card/80 backdrop-blur pl-14 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-display font-black text-foreground mb-2">Host a Battle</h1>
            <p className="text-muted-foreground">Set up your battle room and go live</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Battle Title</label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Lusaka Heat: The Zambian Showdown"
                className={inputClass}
              />
            </div>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Region</label>
            <SelectWrapper icon={MapPin}>
              <select value={form.region} onChange={(e) => update("region", e.target.value)} className={selectClass}>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </SelectWrapper>
          </div>

          {/* Artist names (free text for now until artists table exists) */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Artist A Name</label>
              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={form.artistA}
                  onChange={(e) => update("artistA", e.target.value)}
                  placeholder="$ongChainn artist name"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Artist B Name</label>
              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={form.artistB}
                  onChange={(e) => update("artistB", e.target.value)}
                  placeholder="$ongChainn artist name"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Songs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Song A</label>
              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={form.songA}
                  onChange={(e) => update("songA", e.target.value)}
                  placeholder="Song from $ongChainn"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Song B</label>
              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={form.songB}
                  onChange={(e) => update("songB", e.target.value)}
                  placeholder="Song from $ongChainn"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Schedule (optional — leave blank to go live now)</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="datetime-local" value={form.schedule} onChange={(e) => update("schedule", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Co-Host Invites */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Co-Host Invites (max 4) — $ongChainn users</label>

            {selectedCoHosts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCoHosts.map((u) => (
                  <div key={u.id} className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {(u.display_name || u.username || "?").charAt(0)}
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-foreground">{u.display_name || u.username}</span>
                      {u.username && <span className="text-muted-foreground ml-1">@{u.username}</span>}
                    </div>
                    <button onClick={() => removeCoHost(u.id)} className="text-muted-foreground hover:text-live transition-colors ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={coHostSearch}
                onChange={(e) => { setCoHostSearch(e.target.value); setShowCoHostDropdown(true); }}
                onFocus={() => setShowCoHostDropdown(true)}
                placeholder="Search $ongChainn username..."
                disabled={selectedCoHosts.length >= 4}
                className={`${inputClass} disabled:opacity-50 pr-10`}
              />
              <UserPlus className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              {showCoHostDropdown && selectedCoHosts.length < 4 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-card shadow-2xl max-h-48 overflow-y-auto z-10">
                  {filteredUsers.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">No $ongChainn users found</div>
                  ) : (
                    filteredUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => addCoHost(u)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left border-b border-border/30 last:border-0"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold overflow-hidden">
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            (u.display_name || u.username || "?").charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.display_name || u.username}</p>
                          {u.username && <p className="text-xs text-muted-foreground">@{u.username}</p>}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Any rules, instructions, or notes for participants..."
              rows={3}
              className="w-full rounded-xl border border-border bg-card/80 backdrop-blur px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.3)]"
            >
              <Zap className="h-5 w-5" /> {form.schedule ? "Schedule Battle" : "Go Live Now"}
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-4 font-medium text-muted-foreground hover:bg-muted transition-colors">
              <Save className="h-5 w-5" /> Save Draft
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostCreate;
