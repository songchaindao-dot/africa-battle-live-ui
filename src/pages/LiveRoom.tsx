import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Mic, MicOff, Users, Hand, Send, Play, Pause, SkipForward,
  Square, UserPlus, Volume2, ExternalLink, Heart, Crown, Shield, Smile,
} from "lucide-react";
import LiveBadge from "@/components/LiveBadge";
import { useBattle } from "@/hooks/useBattles";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ChatMessage {
  id: string;
  userName: string;
  text: string;
  timestamp: Date;
  type: "message" | "system" | "reaction";
}

interface RoomParticipant {
  id: string;
  display_name: string | null;
  role: string;
  is_muted: boolean;
  is_speaking: boolean;
  user_id: string;
}

type ViewRole = "host" | "co-host" | "audience";

const LiveRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { data: battle, isLoading } = useBattle(roomId);

  const [viewRole, setViewRole] = useState<ViewRole>("audience");
  const [votedFor, setVotedFor] = useState<"A" | "B" | null>(null);
  const [localVotesA, setLocalVotesA] = useState(0);
  const [localVotesB, setLocalVotesB] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [round, setRound] = useState(1);
  const [sidebarTab, setSidebarTab] = useState<"audience" | "requests" | "chat">("chat");
  const [requestedToSpeak, setRequestedToSpeak] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);

  useEffect(() => {
    if (battle) {
      setLocalVotesA(battle.votesA);
      setLocalVotesB(battle.votesB);
      setRound(battle.round || 1);
    }
  }, [battle]);

  // Fetch participants from battle_rooms
  useEffect(() => {
    if (!roomId) return;
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from("battle_rooms")
        .select("id, display_name, role, is_muted, is_speaking, user_id")
        .eq("battle_id", roomId)
        .eq("is_active", true);
      if (data) setParticipants(data);
    };
    fetchParticipants();
  }, [roomId]);

  const [chatInput, setChatInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalVotes = localVotesA + localVotesB;
  const pctA = totalVotes ? Math.round((localVotesA / totalVotes) * 100) : 50;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: `user-${Date.now()}`,
      userName: profile?.display_name || profile?.username || "You",
      text: chatInput.trim(),
      timestamp: new Date(),
      type: "message",
    };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput("");
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji: string) => {
    setChatInput((prev) => prev + emoji);
  };

  const vote = async (side: "A" | "B") => {
    if (votedFor || !user || !roomId) return;
    setVotedFor(side);
    if (side === "A") setLocalVotesA((v) => v + 1);
    else setLocalVotesB((v) => v + 1);

    await supabase.from("battle_votes").insert({
      battle_id: roomId,
      user_id: user.id,
      side,
      round,
    });
  };

  const host = participants.find((p) => p.role === "host");
  const coHosts = participants.filter((p) => p.role === "co-host");
  const speakers = participants.filter((p) => p.role === "speaker");
  const audience = participants.filter((p) => p.role === "audience");

  const getSidebarTabs = () => {
    if (viewRole === "audience") return ["audience", "chat"] as const;
    return ["audience", "requests", "chat"] as const;
  };

  const sidebarTabs = getSidebarTabs();

  const ParticipantCircle = ({ p, size = "md" }: { p: RoomParticipant; size?: "sm" | "md" | "lg" }) => {
    const sizes = {
      sm: "h-10 w-10 text-xs",
      md: "h-14 w-14 text-sm",
      lg: "h-20 w-20 text-xl",
    };
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`relative rounded-full bg-muted flex items-center justify-center font-bold ${sizes[size]} ${p.is_speaking ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>
          {(p.display_name || "?").charAt(0)}
          {p.role === "host" && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-neon-gold" />}
          {p.role === "co-host" && <Shield className="absolute -top-1 -right-1 h-4 w-4 text-neon-cyan" />}
        </div>
        <div className="flex items-center gap-1">
          {p.is_muted ? <MicOff className="h-3 w-3 text-live" /> : <Mic className="h-3 w-3 text-primary" />}
        </div>
        <span className="text-[10px] text-muted-foreground text-center max-w-16 truncate">{p.display_name || "Anonymous"}</span>
      </div>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isLoading || !battle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{isLoading ? "Loading battle..." : "Battle not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-xl px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <LiveBadge />
                <h1 className="text-sm font-bold text-foreground">{battle.title}</h1>
              </div>
              <p className="text-xs text-muted-foreground">{battle.listeners.toLocaleString()} listening • Round {round}/{battle.totalRounds}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={viewRole}
              onChange={(e) => setViewRole(e.target.value as ViewRole)}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground"
            >
              <option value="audience">Audience View</option>
              <option value="co-host">Co-Host View</option>
              <option value="host">Host View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Speaking Area */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
            <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
              <Mic className="h-4 w-4" /> Speaking Now
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {host && <ParticipantCircle p={host} size="lg" />}
              {coHosts.map((p) => <ParticipantCircle key={p.id} p={p} />)}
              {speakers.map((p) => <ParticipantCircle key={p.id} p={p} />)}
              {participants.length === 0 && (
                <p className="text-sm text-muted-foreground">No speakers yet — join the room!</p>
              )}
            </div>
          </div>

          {/* Battle Panel */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-display text-muted-foreground">Round {round} of {battle.totalRounds}</span>
              <span className="text-xs text-primary flex items-center gap-1"><Play className="h-3 w-3" /> Now Playing</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mb-6">
              <div className="flex flex-col items-center gap-2 text-center">
                {battle.artistA.image && (
                  <img src={battle.artistA.image} alt={battle.artistA.name} className="h-16 w-16 rounded-full object-cover border-2 border-primary/50" />
                )}
                <span className="text-sm font-bold text-foreground">{battle.artistA.name}</span>
                <span className="text-[10px] text-muted-foreground">{battle.songA}</span>
                <a href="https://www.songchainn.xyz" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
                  $ongChainn <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
              <div className="text-center font-display font-bold text-muted-foreground text-lg">VS</div>
              <div className="flex flex-col items-center gap-2 text-center">
                {battle.artistB.image && (
                  <img src={battle.artistB.image} alt={battle.artistB.name} className="h-16 w-16 rounded-full object-cover border-2 border-secondary/50" />
                )}
                <span className="text-sm font-bold text-foreground">{battle.artistB.name}</span>
                <span className="text-[10px] text-muted-foreground">{battle.songB}</span>
                <a href="https://www.songchainn.xyz" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
                  $ongChainn <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>

            {/* Voting Panel */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground text-center">Cast Your Vote</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => vote("A")}
                  disabled={!!votedFor}
                  className={`flex-1 rounded-2xl py-4 font-bold text-lg transition-all duration-300 ${
                    votedFor === "A"
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_0_25px_hsl(var(--neon-green)/0.4)]"
                      : votedFor
                      ? "bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
                      : "bg-primary/10 border-2 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50"
                  }`}
                >
                  Vote {battle.artistA.name}
                </button>
                <button
                  onClick={() => vote("B")}
                  disabled={!!votedFor}
                  className={`flex-1 rounded-2xl py-4 font-bold text-lg transition-all duration-300 ${
                    votedFor === "B"
                      ? "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-[0_0_25px_hsl(var(--cyan)/0.4)]"
                      : votedFor
                      ? "bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
                      : "bg-secondary/10 border-2 border-secondary/30 text-secondary hover:bg-secondary/20 hover:border-secondary/50"
                  }`}
                >
                  Vote {battle.artistB.name}
                </button>
              </div>

              {votedFor && (
                <p className="text-center text-sm text-primary">
                  ✓ You voted for {votedFor === "A" ? battle.artistA.name : battle.artistB.name}
                </p>
              )}

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{localVotesA.toLocaleString()} ({pctA}%)</span>
                <span>{localVotesB.toLocaleString()} ({100 - pctA}%)</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                <div className="bg-primary h-full rounded-l-full transition-all flex items-center justify-center" style={{ width: `${pctA}%` }}>
                  {pctA > 15 && <span className="text-[9px] font-bold text-primary-foreground">{pctA}%</span>}
                </div>
                <div className="bg-secondary h-full rounded-r-full transition-all flex items-center justify-center" style={{ width: `${100 - pctA}%` }}>
                  {100 - pctA > 15 && <span className="text-[9px] font-bold text-secondary-foreground">{100 - pctA}%</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap gap-2">
            {viewRole === "host" && (
              <>
                <button onClick={() => setIsPaused(!isPaused)} className="rounded-xl bg-primary/10 border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all flex items-center gap-2">
                  {isPaused ? <><Play className="h-4 w-4" /> Resume</> : <><Pause className="h-4 w-4" /> Pause Round</>}
                </button>
                <button onClick={() => setRound((r) => Math.min(r + 1, battle.totalRounds))} className="rounded-xl bg-secondary/10 border border-secondary/30 px-4 py-2.5 text-sm font-semibold text-secondary hover:bg-secondary/20 transition-all flex items-center gap-2">
                  <SkipForward className="h-4 w-4" /> Next Round
                </button>
                <button className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface-3 flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Invite Co-Host
                </button>
                <button className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface-3 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" /> Mute Speaker
                </button>
                <button onClick={() => navigate("/")} className="ml-auto rounded-xl bg-live/10 border border-live/30 px-4 py-2.5 text-sm font-semibold text-live hover:bg-live/20 transition-all flex items-center gap-2">
                  <Square className="h-4 w-4" /> End Battle
                </button>
              </>
            )}
            {viewRole === "co-host" && (
              <>
                <button className="rounded-xl bg-primary/10 border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary flex items-center gap-2"><Hand className="h-4 w-4" /> Approve Speaker</button>
                <button className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground flex items-center gap-2"><Volume2 className="h-4 w-4" /> Mute</button>
                <button className="rounded-xl bg-live/10 border border-live/30 px-4 py-2.5 text-sm font-semibold text-live flex items-center gap-2"><Square className="h-4 w-4" /> Remove</button>
              </>
            )}
            {viewRole === "audience" && (
              <>
                <button
                  onClick={() => setRequestedToSpeak(true)}
                  disabled={requestedToSpeak}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 transition-all ${
                    requestedToSpeak
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20"
                  }`}
                >
                  <Hand className="h-4 w-4" /> {requestedToSpeak ? "Request Sent ✓" : "Request to Speak"}
                </button>
                <button className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" /> Share
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card/40 flex flex-col">
          <div className="flex border-b border-border">
            {sidebarTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={`flex-1 px-4 py-3 text-xs font-semibold capitalize transition-colors ${
                  sidebarTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === "audience" && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">{audience.length} in audience</p>
                {audience.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/30">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{(p.display_name || "?").charAt(0)}</div>
                    <span className="text-sm text-foreground">{p.display_name || "Anonymous"}</span>
                  </div>
                ))}
                {audience.length === 0 && <p className="text-sm text-muted-foreground">No audience members yet</p>}
              </div>
            )}

            {sidebarTab === "requests" && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">No speaker requests</p>
              </div>
            )}

            {sidebarTab === "chat" && (
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-2 mb-3">
                  {chatMessages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No messages yet. Start the conversation!</p>
                  )}
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`text-sm ${msg.type === "system" ? "text-center text-xs text-muted-foreground italic" : ""}`}>
                      {msg.type === "message" && (
                        <>
                          <span className={`font-semibold ${msg.userName === (profile?.display_name || profile?.username || "You") ? "text-primary" : "text-foreground"}`}>{msg.userName}</span>
                          <span className="text-[10px] text-muted-foreground/50 ml-1">{formatTime(msg.timestamp)}</span>
                          <p className="text-muted-foreground">{msg.text}</p>
                        </>
                      )}
                      {msg.type === "system" && <span>{msg.text}</span>}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="flex gap-2 mt-auto">
                  <div className="relative flex-1">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Say something..."
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-full right-0 mb-2 flex gap-1 rounded-lg border border-border bg-card p-2">
                        {["🔥", "💯", "🇿🇲", "👏", "❤️", "😂", "💪", "🎵"].map((e) => (
                          <button key={e} onClick={() => addEmoji(e)} className="text-lg hover:scale-125 transition-transform">
                            {e}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={sendMessage} className="rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRoom;
