import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { useFavorites } from "@/lib/favorites";
import { CALLIGRAPHERS, CHARACTERS, DAILY_QUOTES } from "@/lib/data";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/me")({
  component: MePage,
});

function MePage() {
  const { favorites } = useFavorites();

  const charFavs = useMemo(
    () =>
      favorites
        .filter((f) => f.kind === "character")
        .map((f) => CHARACTERS.find((c) => c.id === f.id))
        .filter(Boolean),
    [favorites]
  );
  const calligrapherFavs = useMemo(
    () =>
      favorites
        .filter((f) => f.kind === "calligrapher")
        .map((f) => CALLIGRAPHERS.find((c) => c.id === f.id))
        .filter(Boolean),
    [favorites]
  );

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
            Studio · 书房
          </span>
          <h1 className="font-latin text-3xl font-bold italic tracking-tight">
            Your collection
          </h1>
          <p className="text-sm text-muted-foreground">
            Saved characters, masters, and daily readings.
          </p>
        </header>

        <section className="grid grid-cols-3 gap-3">
          <Stat label="Saved" value={favorites.length} />
          <Stat label="Characters" value={charFavs.length} />
          <Stat label="Masters" value={calligrapherFavs.length} />
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Character favorites
          </h2>
          {charFavs.length === 0 ? (
            <EmptyHint text="Tap the heart on a character to save it." linkTo="/search" linkLabel="Browse archive" />
          ) : (
            <ul className="grid grid-cols-3 gap-2">
              {charFavs.map((c) => (
                <li key={c!.id}>
                  <Link
                    to="/characters/$id"
                    params={{ id: c!.id }}
                    className="flex aspect-square flex-col items-center justify-center rounded-md border border-border bg-card p-2 transition hover:border-cinnabar"
                  >
                    <span className="font-display text-4xl leading-none">
                      {c!.character}
                    </span>
                    <span className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">
                      {c!.pinyin}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Master favorites
          </h2>
          {calligrapherFavs.length === 0 ? (
            <EmptyHint text="Save calligraphers from their profile page." linkTo="/calligraphers" linkLabel="Browse masters" />
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
              {calligrapherFavs.map((c) => (
                <li key={c!.id}>
                  <Link
                    to="/calligraphers/$id"
                    params={{ id: c!.id }}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border font-display text-xl">
                      {c!.chinese[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-latin text-sm font-bold">{c!.name}</p>
                      <p className="font-mono text-[10px] uppercase text-muted-foreground">
                        {c!.dynasty} · {c!.years}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Weekly challenge
          </h2>
          <div className="rounded-sm border border-cinnabar/20 bg-cinnabar/5 p-5">
            <p className="font-latin text-lg font-bold text-cinnabar">
              Practice five characters
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Complete tracing for 5 characters this week to earn the{" "}
              <em className="not-italic text-ink">First Brush</em> seal.
            </p>
            <Link
              to="/practice"
              className="mt-4 inline-block rounded-md bg-cinnabar px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-paper"
            >
              Open practice
            </Link>
          </div>
        </section>

        <section className="space-y-3 pb-4">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Today's reading
          </h2>
          <div className="rounded-sm border border-border bg-card p-5 text-center">
            <p className="font-serif text-lg leading-relaxed">{DAILY_QUOTES[0].chinese}</p>
            <p className="mt-2 text-xs italic text-muted-foreground">
              {DAILY_QUOTES[0].translation}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border border-border bg-card p-3 text-center">
      <p className="font-latin text-2xl font-bold">{value}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function EmptyHint({
  text,
  linkTo,
  linkLabel,
}: {
  text: string;
  linkTo: "/search" | "/calligraphers";
  linkLabel: string;
}) {
  return (
    <div className="rounded-sm border border-dashed border-border p-6 text-center">
      <p className="text-xs italic text-muted-foreground">{text}</p>
      <Link
        to={linkTo}
        className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-cinnabar"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
