import { Link, useNavigate } from "react-router-dom";

/**
 * Uses Link element if there is a react browser-router available, or
 * fallbacks to simple anchors (a) if there is no router context allowed
 */
export function SafeLink({to, children }: { to: string, children: React.ReactNode }) {
  try {
    useNavigate();
    return <Link to={to}>{children}</Link>
  } catch {
    return <a href={to}>{children}</a>
  }
}
