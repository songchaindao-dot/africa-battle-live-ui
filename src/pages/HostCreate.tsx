import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Zap, Save, X, Search, Check, UserPlus, ChevronDown, Music, MapPin, Calendar, FileText, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artists, mockUsers } from "@/data/mockData";

const regions = ["Zambia", "South Africa", "Nigeria", "Zimbabwe", "Botswana"];

const SelectWrapper = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    {children}
    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

const HostCreate = () => {
  const navigate = useNavigate();
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
  const [selectedCoHosts, setSelectedCoHosts] = useState<typeof mockUsers>([]);
  const [showCoHostDropdown, setShowCoHostDropdown] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const artistAObj = artists.find((a) => a.id === form.artistA);
  const artistBObj = artists.find((a) => a.id === form.artistB);

  const filteredUsers = useMemo(() => {
    if (!coHostSearch.trim()) return mockUsers.filter(u => !selectedCoHosts.find(s => s.id === u.id));
    return mockUsers.filter(
      (u) =>
        !selectedCoHosts.find((s) => s.id === u.id) &&
        (u.username.toLowerCase().includes(coHostSearch.toLowerCase()) ||
          u.displayName.toLowerCase().includes(coHostSearch.toLowerCase()))
    );
  }, [coHostSearch, selectedCoHosts]);

  const addCoHost = (user: typeof mockUsers[0]) => {
    if (selectedCoHosts.length >= 4) return;
    setSelectedCoHosts((prev) => [...prev, user]);
    setCoHostSearch("");
    setShowCoHostDropdown(false);
  };

  const removeCoHost = (userId: string) => {
    setSelectedCoHosts((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSubmit = () => {
    navigate("/room/b1");
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

          {/* Artists */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Artist A</label>
              <SelectWrapper icon={Music}>
                <select
                  value={form.artistA}
                  onChange={(e) => { update("artistA", e.target.value); update("songA", ""); }}
                  className={selectClass}
                >
                  <option value="">Select artist</option>
                  {artists.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </SelectWrapper>
              {artistAObj && (
                <div className="flex items-center gap-3 mt-2 rounded-xl border border-border bg-card/60 p-3">
                  <img src={artistAObj.image} alt={artistAObj.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{artistAObj.name}</p>
                    <p className="text-xs text-muted-foreground">{artistAObj.followers.toLocaleString()} followers on $ongChainn</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Artist B</label>
              <SelectWrapper icon={Music}>
                <select
                  value={form.artistB}
                  onChange={(e) => { update("artistB", e.target.value); update("songB", ""); }}
                  className={selectClass}
                >
                  <option value="">Select artist</option>
                  {artists.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </SelectWrapper>
              {artistBObj && (
                <div className="flex items-center gap-3 mt-2 rounded-xl border border-border bg-card/60 p-3">
                  <img src={artistBObj.image} alt={artistBObj.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{artistBObj.name}</p>
                    <p className="text-xs text-muted-foreground">{artistBObj.followers.toLocaleString()} followers on $ongChainn</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Songs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Song A</label>
              {artistAObj ? (
                <SelectWrapper icon={Music}>
                  <select value={form.songA} onChange={(e) => update("songA", e.target.value)} className={selectClass}>
                    <option value="">Select song from $ongChainn</option>
                    {artistAObj.songs.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </SelectWrapper>
              ) : (
                <div className="rounded-xl border border-border bg-muted/30 px-4 py-3.5 text-sm text-muted-foreground">
                  Select an artist first
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Song B</label>
              {artistBObj ? (
                <SelectWrapper icon={Music}>
                  <select value={form.songB} onChange={(e) => update("songB", e.target.value)} className={selectClass}>
                    <option value="">Select song from $ongChainn</option>
                    {artistBObj.songs.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </SelectWrapper>
              ) : (
                <div className="rounded-xl border border-border bg-muted/30 px-4 py-3.5 text-sm text-muted-foreground">
                  Select an artist first
                </div>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Schedule</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="datetime-local" value={form.schedule} onChange={(e) => update("schedule", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Co-Host Invites */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Co-Host Invites (max 4)</label>

            {selectedCoHosts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCoHosts.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {user.displayName.charAt(0)}
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-foreground">{user.displayName}</span>
                      <span className="text-muted-foreground ml-1">@{user.username}</span>
                    </div>
                    <button onClick={() => removeCoHost(user.id)} className="text-muted-foreground hover:text-live transition-colors ml-1">
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
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">No users found</div>
                  ) : (
                    filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => addCoHost(user)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left border-b border-border/30 last:border-0"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {user.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.displayName}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
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
              <Zap className="h-5 w-5" /> Go Live Now
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
