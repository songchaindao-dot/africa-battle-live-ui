import { useState, useRef, useEffect } from "react";
import { Bell, Zap, Users, Trophy, Music, MessageCircle, X } from "lucide-react";

interface Notification {
  id: string;
  type: "battle_live" | "battle_invite" | "battle_ended" | "cohost_invite" | "new_follower" | "chat_mention";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: typeof Zap;
  accentClass: string;
}

const mockNotifications: Notification[] = [
  {
    id: "n1", type: "battle_live",
    title: "Battle Going Live!",
    message: "Lusaka Heat: The Zambian Showdown is now LIVE — IMan Afrikah vs 7ROO7H BASED",
    time: "2 min ago", read: false, icon: Zap,
    accentClass: "text-primary",
  },
  {
    id: "n2", type: "cohost_invite",
    title: "Co-Host Invite",
    message: "DJ Cosmo invited you to co-host 'Cross-Border Clash'",
    time: "15 min ago", read: false, icon: Users,
    accentClass: "text-secondary",
  },
  {
    id: "n3", type: "battle_ended",
    title: "Battle Results In!",
    message: "Santana won Kopala Kingz Clash vs IMan Afrikah — 3,150 to 2,890 votes",
    time: "1 hr ago", read: false, icon: Trophy,
    accentClass: "text-neon-gold",
  },
  {
    id: "n4", type: "chat_mention",
    title: "You were mentioned",
    message: 'LusakaVibes mentioned you in Lusaka Heat chat: "@you this round is crazy!"',
    time: "5 min ago", read: true, icon: MessageCircle,
    accentClass: "text-secondary",
  },
  {
    id: "n5", type: "battle_invite",
    title: "Upcoming Battle",
    message: "Livingstone Town Square Clash starts in 2 days — Sanchy vs DenaJah",
    time: "3 hr ago", read: true, icon: Music,
    accentClass: "text-primary",
  },
  {
    id: "n6", type: "new_follower",
    title: "New Follower on $ongChainn",
    message: "ZedBeats started following you",
    time: "6 hr ago", read: true, icon: Users,
    accentClass: "text-muted-foreground",
  },
];

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-live text-[10px] font-bold text-foreground">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 md:w-96 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold text-foreground text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mb-2 opacity-40" />
                <span className="text-sm">No notifications yet</span>
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id}>
                    <div
                      onClick={() => markRead(n.id)}
                      className={`group flex items-start gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                    >
                      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${n.accentClass}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{n.title}</span>
                          {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-muted-foreground/60 mt-1 block">{n.time}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all shrink-0"
                      >
                        <X className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-border px-4 py-2.5 text-center">
            <button className="text-xs text-primary hover:underline">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
