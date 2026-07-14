import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { CALLIGRAPHERS, getScript } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/calligraphers/")({
  component: CalligraphersList,
});

function CalligraphersList() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-8 px-6 pb-8 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <ChevronLeft className="size-3" /> Home
        </Link>

        <header className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
            Masters · 书家
          </span>
          <h1 className="font-latin text-3xl font-bold italic tracking-tight">
            Famous calligraphers
          </h1>
          <p className="text-sm text-muted-foreground">
            Eight figures who shaped the tradition.
          </p>
        </header>

        <ul className="divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
          {CALLIGRAPHERS.map((c) => {
            const style = getScript(c.signatureStyle);
            return (
              <li key={c.id}>
                <Link
                  to="/calligraphers/$id"
                  params={{ id: c.id }}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-muted"
                >
                  <div className="grid size-14 shrink-0 place-items-center rounded-full border border-border bg-paper font-display text-2xl">
                    {c.chinese[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-latin text-base font-bold leading-tight">
                      {c.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.dynasty} · {c.years}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">
                    {style?.pinyin}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
