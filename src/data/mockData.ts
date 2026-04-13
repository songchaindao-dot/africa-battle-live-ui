export interface Artist {
  id: string;
  name: string;
  image: string;
  region: string;
  followers: number;
  songs: string[];
}

export interface Battle {
  id: string;
  title: string;
  status: "live" | "upcoming" | "ended";
  artistA: Artist;
  artistB: Artist;
  songA: string;
  songB: string;
  host: string;
  coHosts: string[];
  listeners: number;
  votesA: number;
  votesB: number;
  region: string;
  scheduledTime?: string;
  endedTime?: string;
  winner?: "A" | "B";
  round: number;
  totalRounds: number;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: "host" | "co-host" | "speaker" | "audience";
  isMuted: boolean;
  isSpeaking: boolean;
}

export interface ChatMessage {
  id: string;
  userName: string;
  text: string;
  timestamp: Date;
  type: "message" | "system" | "reaction";
}

export interface MockUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export const mockUsers: MockUser[] = [
  { id: "u1", username: "dj_cosmo", displayName: "DJ Cosmo", avatar: "" },
  { id: "u2", username: "shinko_beats", displayName: "Shinko Beats", avatar: "" },
  { id: "u3", username: "k_star_zed", displayName: "K-Star", avatar: "" },
  { id: "u4", username: "radio_matic", displayName: "Radio Matic", avatar: "" },
  { id: "u5", username: "trina_south", displayName: "Trina South", avatar: "" },
  { id: "u6", username: "favour_fm", displayName: "Favour FM", avatar: "" },
  { id: "u7", username: "mc_africa", displayName: "MC Africa", avatar: "" },
  { id: "u8", username: "big_bwana", displayName: "Big Bwana", avatar: "" },
  { id: "u9", username: "zed_beats_fan", displayName: "ZedBeats", avatar: "" },
  { id: "u10", username: "chili_fan_01", displayName: "ChiliFan01", avatar: "" },
];

export const artists: Artist[] = [
  {
    id: "a1", name: "IMan Afrikah",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/file_0000000077c8722f8f65c9d1abd8bca1-2.png",
    region: "Zambia", followers: 245000,
    songs: ["Endless", "JIGGY WITH ME (ft TRACEY LOVE)", "TURN IT UP AGAIN", "LOVERS", "AFRICAN SOUL", "RHYTHM OF LIFE", "WARRIORS"],
  },
  {
    id: "a2", name: "7ROO7H BASED",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/7ROO7H%20%20Based/7ROO7H%20Based%20(1).png",
    region: "Zambia", followers: 310000,
    songs: ["DISCORD", "INSIDE LIBALA RMS", "THE GOLDEN STOPWATCH", "MY OWN", "ME", "THE SUMO WRESLER", "BASED LIFE"],
  },
  {
    id: "a3", name: "NDA",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/NDA/NDA%20(1).png",
    region: "Zambia", followers: 198000,
    songs: ["STILL", "BIEH", "BEAMM", "CALM", "SIGNALS", "MIDNIGHT THOUGHTS", "UNDENIABLE"],
  },
  {
    id: "a4", name: "Santana",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/Santana/Santana%20(1).png",
    region: "Zambia", followers: 420000,
    songs: ["BUMBLE BEE", "NYASH", "NYASH EXT", "CHERIE", "Brick By Brick", "GNB", "DIAL TONE", "POISON", "SOKO", "DEVINE", "SHAKE", "SLOW FIRE"],
  },
  {
    id: "a5", name: "PRP",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/PRP/PRP%20(2).png",
    region: "Zambia", followers: 175000,
    songs: ["LOVE & SHELTER", "TELL ME", "NO LIMITS", "KEEP", "EYA", "KEYS", "VIBE", "ME", "EVEN ME", "ALE TI", "PANADO"],
  },
  {
    id: "a6", name: "FAITH",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/FAITH/Faith%20(2).png",
    region: "Zambia", followers: 210000,
    songs: ["RISE", "UNTAMED", "NO SEATS", "RADIANT", "GOLD AURA", "LION HEART", "CROWN UP"],
  },
  {
    id: "a7", name: "Sanchy",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/Sanchy/Sanchy%20(1).png",
    region: "Zambia", followers: 890000,
    songs: ["HONEY BURN", "SACRED SEDUCTION", "GODDESS MODE", "Midnight", "NO APOLOGY", "ANXIETY"],
  },
  {
    id: "a8", name: "DenaJah",
    image: "https://pub-221dc60ecc5143e3b28d9d2bfa2cbee0.r2.dev/DenaJah/file_0000000064dc71f5be6445bc8e4cda04.png",
    region: "Zambia", followers: 320000,
    songs: ["HUNTER", "LOVIE", "Alone", "COME CLOSER", "Dance", "MY BABY"],
  },
];

export const liveBattles: Battle[] = [
  {
    id: "b1", title: "Lusaka Heat: The Zambian Showdown", status: "live",
    artistA: artists[0], artistB: artists[1], songA: "Endless", songB: "DISCORD",
    host: "DJ Cosmo", coHosts: ["Shinko Beats", "K-Star"], listeners: 2847,
    votesA: 1245, votesB: 1102, region: "Zambia", round: 2, totalRounds: 3,
  },
  {
    id: "b2", title: "Cross-Border Clash", status: "live",
    artistA: artists[3], artistB: artists[4], songA: "BUMBLE BEE", songB: "LOVE & SHELTER",
    host: "Radio Matic", coHosts: ["Trina South"], listeners: 5120,
    votesA: 2890, votesB: 3001, region: "Zambia", round: 1, totalRounds: 3,
  },
  {
    id: "b3", title: "Kopala Queens & Kings", status: "live",
    artistA: artists[5], artistB: artists[2], songA: "RISE", songB: "STILL",
    host: "Favour FM", coHosts: [], listeners: 1350,
    votesA: 620, votesB: 710, region: "Zambia", round: 3, totalRounds: 3,
  },
];

export const upcomingBattles: Battle[] = [
  {
    id: "b4", title: "Livingstone Town Square Clash", status: "upcoming",
    artistA: artists[6], artistB: artists[7], songA: "HONEY BURN", songB: "HUNTER",
    host: "MC Africa", coHosts: ["DJ Zinhle"], listeners: 0,
    votesA: 0, votesB: 0, region: "Zambia", scheduledTime: "2026-04-15T19:00:00Z",
    round: 0, totalRounds: 3,
  },
  {
    id: "b5", title: "Zambia Rising Stars", status: "upcoming",
    artistA: artists[4], artistB: artists[5], songA: "TELL ME", songB: "UNTAMED",
    host: "Big Bwana", coHosts: [], listeners: 0,
    votesA: 0, votesB: 0, region: "Zambia", scheduledTime: "2026-04-16T20:00:00Z",
    round: 0, totalRounds: 3,
  },
];

export const endedBattles: Battle[] = [
  {
    id: "b6", title: "Kopala Kingz Clash", status: "ended",
    artistA: artists[3], artistB: artists[0], songA: "NYASH", songB: "JIGGY WITH ME (ft TRACEY LOVE)",
    host: "DJ Cosmo", coHosts: ["K-Star"], listeners: 4200,
    votesA: 3150, votesB: 2890, region: "Zambia", endedTime: "2026-04-12T22:00:00Z",
    winner: "A", round: 3, totalRounds: 3,
  },
  {
    id: "b7", title: "Seduction vs Signals", status: "ended",
    artistA: artists[6], artistB: artists[2], songA: "SACRED SEDUCTION", songB: "STILL",
    host: "Favour FM", coHosts: [], listeners: 3100,
    votesA: 1400, votesB: 1650, region: "Zambia", endedTime: "2026-04-11T21:00:00Z",
    winner: "B", round: 3, totalRounds: 3,
  },
];

export const participants: Participant[] = [
  { id: "p1", name: "DJ Cosmo", avatar: "", role: "host", isMuted: false, isSpeaking: true },
  { id: "p2", name: "Shinko Beats", avatar: "", role: "co-host", isMuted: false, isSpeaking: false },
  { id: "p3", name: "K-Star", avatar: "", role: "co-host", isMuted: true, isSpeaking: false },
  { id: "p4", name: "MusicFan_ZM", avatar: "", role: "speaker", isMuted: false, isSpeaking: true },
  { id: "p5", name: "BeatDropper", avatar: "", role: "speaker", isMuted: false, isSpeaking: false },
  { id: "p6", name: "LusakaVibes", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p7", name: "ZedBeats", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p8", name: "ChiliFan01", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p9", name: "AmbivertSoul", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p10", name: "CopperSounds", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p11", name: "NdolaGirl", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
  { id: "p12", name: "KabulongaBoy", avatar: "", role: "audience", isMuted: true, isSpeaking: false },
];

export const speakerRequests = [
  { id: "sr1", name: "ZedBeats", avatar: "" },
  { id: "sr2", name: "ChiliFan01", avatar: "" },
  { id: "sr3", name: "NdolaGirl", avatar: "" },
];

export const mockChatMessages: ChatMessage[] = [
  { id: "c1", userName: "LusakaVibes", text: "🔥🔥🔥 IMan Afrikah is killing it!", timestamp: new Date(Date.now() - 120000), type: "message" },
  { id: "c2", userName: "System", text: "Round 2 has started", timestamp: new Date(Date.now() - 90000), type: "system" },
  { id: "c3", userName: "CopperSounds", text: "7ROO7H BASED's flow is insane 💯", timestamp: new Date(Date.now() - 60000), type: "message" },
  { id: "c4", userName: "AmbivertSoul", text: "This battle is too close to call!", timestamp: new Date(Date.now() - 45000), type: "message" },
  { id: "c5", userName: "KabulongaBoy", text: "Zambian music on another level 🇿🇲", timestamp: new Date(Date.now() - 30000), type: "message" },
  { id: "c6", userName: "NdolaGirl", text: "Vote IMan Afrikah! 🗳️", timestamp: new Date(Date.now() - 15000), type: "message" },
  { id: "c7", userName: "ZedBeats", text: "The energy in this room is crazy!", timestamp: new Date(Date.now() - 5000), type: "message" },
];

export const countries = [
  { name: "Zambia", status: "live" as const },
  { name: "South Africa", status: "coming-soon" as const },
  { name: "Nigeria", status: "coming-soon" as const },
  { name: "Zimbabwe", status: "coming-soon" as const },
  { name: "Botswana", status: "coming-soon" as const },
];
