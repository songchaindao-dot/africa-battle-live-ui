import { ExternalLink, Home } from "lucide-react";
import { useEmbedMode } from "@/contexts/EmbedModeContext";

interface EmbedTopBarProps {
  title?: string;
}

const EmbedTopBar = ({ title }: EmbedTopBarProps) => {
  const songchainnLogoUrl = "/songchainn-logo.webp?v=20260418";
  const { isEmbedded, openStandalone } = useEmbedMode();
  const returnToSongchainHome = () => {
    const songchainHomeUrl = "https://www.songchainn.xyz/";

    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = songchainHomeUrl;
        return;
      }
    } catch {
      // Fall back to same-window navigation if top-level redirect is blocked.
    }

    window.location.href = songchainHomeUrl;
  };

  if (!isEmbedded) return null;

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-card/70 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <p className="truncate text-sm font-semibold text-foreground">{title || "WaveWarz Africa"}</p>
        <div className="flex items-center gap-2">
          <img src={songchainnLogoUrl} alt="Songchainn" className="h-7 w-auto opacity-90" />
          <button
            onClick={returnToSongchainHome}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/50"
          >
            Return To Songchainn
            <Home className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => openStandalone()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/50"
          >
            Open Full Battle View
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmbedTopBar;
