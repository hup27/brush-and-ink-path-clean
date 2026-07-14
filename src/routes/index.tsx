import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CHARACTERS,
  CALLIGRAPHERS,
  DAILY_QUOTES,
  SCRIPT_STYLES,
  pickForToday,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const daily = pickForToday(CHARACTERS);
  const quote = pickForToday(DAILY_QUOTES, 1);
  const master = pickForToday(CALLIGRAPHERS, 2);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-12 px-6 pb-8 pt-8">
        {/* Daily Character */}
        <section className="animate-reveal-ink">
          <div className="mb-6 flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
                Daily Character · 每日一字
              </span>
              <h2 className="font-latin text-3xl font-bold italic tracking-tight">
                {daily.meaning.split(",")[0]}
              </h2>
            </div>
            <FavoriteButton kind="character" id={daily.id} />
          </div>

          <Link
            to="/characters/$id"
            params={{ id: daily.id }}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-card ring-1 ring-black/5"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <div className="h-[80%] w-[80%] border border-ink" />
              <div className="absolute h-px w-full bg-ink" />
              <div className="absolute h-full w-px bg-ink" />
              <div className="absolute h-full w-px rotate-45 bg-ink" />
              <div className="absolute h-full w-px -rotate-45 bg-ink" />
            </div>
            <span className="select-none font-display text-[11rem] leading-none text-ink">
              {daily.character}
            </span>
            <div className="absolute bottom-4 right-4 text-right">
              <div className="font-mono text-[10px] text-muted-foreground">
                Pinyin: {daily.pinyin}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                Strokes: {daily.strokes}
              </div>
            </div>
          </Link>

          <div className="mt-6 grid grid-cols-2 gap-8 border-t border-border pt-6">
            <div className="space-y-2">
              <h3 className="font-mono text-[10px] uppercase text-muted-foreground">
                Etymology
              </h3>
              <p className="text-pretty text-sm leading-relaxed">
                {daily.etymology.slice(0, 130)}
                {daily.etymology.length > 130 ? "…" : ""}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono text-[10px] uppercase text-muted-foreground">
                Radical
              </h3>
              <p className="text-sm leading-relaxed">
                {daily.radical} ({daily.radicalMeaning})
              </p>
            </div>
          </div>

          <Link
            to="/characters/$id"
            params={{ id: daily.id }}
            className="mt-6 block text-center font-mono text-[10px] uppercase tracking-widest text-cinnabar"
          >
            Study this character →
          </Link>
        </section>

        {/* Quick Tiles */}
        <section className="grid animate-slide-up grid-cols-2 gap-3" style={{ animationDelay: "200ms" }}>
          <Link
            to="/practice"
            className="flex h-28 flex-col justify-between rounded-lg border border-jade/15 bg-jade/5 p-4 transition-colors hover:bg-jade/10"
          >
            <span className="text-sm font-medium text-jade">Practice</span>
            <span className="text-xs italic text-jade/70">Brush tracing</span>
          </Link>
          <Link
            to="/search"
            className="flex h-28 flex-col justify-between rounded-lg bg-ink p-4"
          >
            <span className="text-sm font-medium text-paper">Database</span>
            <span className="text-xs italic text-paper/60">
              {CHARACTERS.length} characters
            </span>
          </Link>
        </section>

        {/* Script Styles */}
        <section className="animate-slide-up space-y-4" style={{ animationDelay: "300ms" }}>
          <div className="flex items-end justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest">Script Styles</h3>
            <Link
              to="/search"
              className="font-mono text-[10px] text-muted-foreground"
            >
              View all
            </Link>
          </div>
          <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 pb-4">
            {SCRIPT_STYLES.map((s) => (
              <Link
                key={s.id}
                to="/search"
                search={{ style: s.id }}
                className="flex aspect-[3/4] w-32 shrink-0 flex-col justify-between rounded border border-border p-3 transition-colors hover:border-cinnabar"
              >
                <span className="font-display text-3xl opacity-40">
                  {s.chinese[0]}
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-bold">{s.pinyin}</p>
                  <p className="text-[10px] text-muted-foreground">{s.english}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily Quote */}
        <section
          className="animate-slide-up space-y-6 rounded-sm bg-card p-8 text-center ring-1 ring-black/5"
          style={{ animationDelay: "400ms" }}
        >
          <div
            className="mx-auto font-serif text-2xl leading-relaxed"
            style={{ writingMode: "vertical-rl" }}
          >
            {quote.chinese}
          </div>
          <div className="mx-auto max-w-[28ch] space-y-2">
            <p className="text-xs italic text-muted-foreground">"{quote.translation}"</p>
            <p className="font-mono text-[10px] uppercase tracking-widest">
              — {quote.author}, {quote.dynasty}
            </p>
          </div>
        </section>

        {/* Featured Master */}
        <section className="animate-slide-up" style={{ animationDelay: "500ms" }}>
          <div className="mb-4 flex items-end justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest">Featured Master</h3>
            <Link to="/calligraphers" className="font-mono text-[10px] text-muted-foreground">
              All masters
            </Link>
          </div>
          <Link
            to="/calligraphers/$id"
            params={{ id: master.id }}
            className="flex items-start gap-6"
          >
            <div className="grid aspect-square w-24 shrink-0 place-items-center rounded-full border border-border bg-muted font-display text-4xl text-ink/70">
              {master.chinese[0]}
            </div>
            <div className="space-y-2">
              <h4 className="font-latin text-lg font-bold leading-none">{master.name}</h4>
              <p className="font-mono text-[10px] text-muted-foreground">
                {master.dynasty} Dynasty · {master.years}
              </p>
              <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
                {master.bio.slice(0, 140)}…
              </p>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
