import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { TIMELINE } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-10 px-6 pb-8 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <ChevronLeft className="size-3" /> Home
        </Link>

        <header className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
            Timeline · 演变
          </span>
          <h1 className="font-latin text-3xl font-bold italic tracking-tight">
            Evolution of scripts
          </h1>
          <p className="text-sm text-muted-foreground">
            Three thousand years, from oracle bone to cursive.
          </p>
        </header>

        <ol className="relative space-y-8 border-l border-border pl-6">
          {TIMELINE.map((era, i) => (
            <li key={era.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="absolute -left-[7px] mt-2 size-3 rounded-full border-2 border-paper bg-cinnabar" />
              <div className="rounded-sm border border-border bg-card p-5">
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-latin text-lg font-bold leading-tight">
                      {era.script}
                    </p>
                    <p className="font-display text-base text-muted-foreground">
                      {era.chinese}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-cinnabar">
                    {era.period}
                  </span>
                </div>
                <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
                  {era.description}
                </p>
                <div className="mt-4 flex items-end gap-3 border-t border-border pt-4">
                  <span className="font-display text-4xl leading-none">
                    {era.sample}
                  </span>
                  <span className="pb-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Sample
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
