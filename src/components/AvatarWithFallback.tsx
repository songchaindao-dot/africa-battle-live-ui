import { useState } from "react";

interface AvatarWithFallbackProps {
  src?: string | null;
  alt?: string;
  fallbackText: string;
  imgClassName?: string;
  fallbackClassName?: string;
}

const AvatarWithFallback = ({
  src,
  alt = "",
  fallbackText,
  imgClassName = "h-full w-full object-cover",
  fallbackClassName = "flex h-full w-full items-center justify-center text-xs font-bold text-primary",
}: AvatarWithFallbackProps) => {
  const [errored, setErrored] = useState(false);
  const initial = (fallbackText || "?").trim().charAt(0).toUpperCase() || "?";

  if (!src || errored) {
    return <span className={fallbackClassName}>{initial}</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      onError={() => setErrored(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default AvatarWithFallback;
