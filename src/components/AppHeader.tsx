import { Link } from "@tanstack/react-router";

export function AppHeader({ volume }: { volume?: string }) {
  const today = new Date();
  const vol =
    volume ??
    `Vol. ${String(Math.floor((today.getTime() / 86400000) % 999)).padStart(3, "0")}`;
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-paper/80 px-6 py-4 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3">
        <div className="grid size-8 place-items-center bg-cinnabar font-display text-xl leading-none text-paper">
          <span className="pt-1">书</span>
        </div>
        <span className="font-latin text-lg font-bold tracking-tight">Shu Yun</span>
      </Link>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {vol}
      </div>
    </header>
  );
}
