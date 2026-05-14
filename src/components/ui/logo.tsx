import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <span className="text-xl font-extrabold tracking-tighter text-ink">
        AdNova<span className="text-orange">.</span>
      </span>
    </Link>
  );
}
