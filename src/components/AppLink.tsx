import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useEmbedMode } from "@/contexts/EmbedModeContext";

const AppLink = forwardRef<HTMLAnchorElement, LinkProps>(function AppLink(props, ref) {
  const { embedTo, isEmbedded } = useEmbedMode();
  const nextTo = isEmbedded ? embedTo(props.to) : props.to;
  return <Link {...props} ref={ref} to={nextTo} />;
});

export default AppLink;
