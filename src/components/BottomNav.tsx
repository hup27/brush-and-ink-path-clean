import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Clock, Brush, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/practice", label: "Practice", icon: Brush },
  { to: "/timeline", label: "History", icon: Clock },
  { to: "/me", label: "Me", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-paper/90 px-4 py-2 backdrop-blur-xl"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <ul className="mx-auto flex max-w-md items-center justify-between">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 px-3 py-1.5"
              >
                <Icon
                  className={`size-[18px] transition-colors ${
                    active ? "text-ink" : "text-muted-foreground"
                  }`}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span
                  className={`font-mono text-[9px] uppercase tracking-tight transition-colors ${
                    active ? "text-ink" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <span className="absolute -bottom-0 h-0.5 w-1 rounded-full bg-cinnabar" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
