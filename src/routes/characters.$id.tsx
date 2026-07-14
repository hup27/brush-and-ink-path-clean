import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CHARACTERS, SCRIPT_STYLES, getCharacter } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/characters/$id")({
  loader: ({ params }) => {
    const c = getCharacter(params.id);
    if (!c) throw notFound();
    return { character: c };
  },
  component: CharacterDetail,
  notFoundComponent: () => (
    <>
      <AppHeader />
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="font-display text-6xl text-cinnabar">无</p>
        <p className="mt-4 text-sm text-muted-foreground">Character not found.</p>
        <Link to="/search" className="mt-6 inline-block font-mono text-[10px] uppercase tracking-widest text-cinnabar">
          Back to search
        </Link>
      </div>
    </>
  ),
});

function CharacterDetail() {
  const { character: c } = Route.useLoaderData();
  const others = CHARACTERS.filter((x) => x.id !== c.id).slice(0, 4);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-10 px-6 pb-8 pt-6">
        <Link
          to="/search"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <ChevronLeft className="size-3" /> Archive
        </Link>

        <section className="animate-reveal-ink space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
                {c.pinyin} · HSK {c.hsk ?? "—"}
              </span>
              <h1 className="mt-1 font-latin text-3xl font-bold italic">
                {c.meaning}
              </h1>
            </div>
            <FavoriteButton kind="character" id={c.id} />
          </div>

          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-card ring-1 ring-black/5">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <div className="h-[80%] w-[80%] border border-ink" />
              <div className="absolute h-px w-full bg-ink" />
              <div className="absolute h-full w-px bg-ink" />
              <div className="absolute h-full w-px rotate-45 bg-ink" />
              <div className="absolute h-full w-px -rotate-45 bg-ink" />
            </div>
            <span className="font-display text-[13rem] leading-none">{c.character}</span>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-y border-border py-4 text-center">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Strokes
              </dt>
              <dd className="mt-1 font-latin text-xl font-bold">{c.strokes}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Radical
              </dt>
              <dd className="mt-1 font-display text-xl">{c.radical}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                HSK
              </dt>
              <dd className="mt-1 font-latin text-xl font-bold">{c.hsk ?? "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Etymology & Origin
          </h2>
          <p className="text-pretty text-sm leading-relaxed">{c.etymology}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Cultural Significance
          </h2>
          <p className="text-pretty text-sm leading-relaxed">{c.cultural}</p>
          {c.quote && (
            <blockquote className="mt-2 rounded-sm border-l-2 border-cinnabar bg-card p-4 font-latin text-sm italic">
              {c.quote}
            </blockquote>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Example Words
          </h2>
          <ul className="divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
            {c.examples.map((ex: { word: string; pinyin: string; meaning: string }) => (
              <li key={ex.word} className="flex items-baseline justify-between p-4">
                <div>
                  <span className="font-display text-2xl">{ex.word}</span>
                  <span className="ml-3 font-mono text-[10px] uppercase text-muted-foreground">
                    {ex.pinyin}
                  </span>
                </div>
                <span className="text-xs italic text-muted-foreground">{ex.meaning}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Across Script Styles
          </h2>
          <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6">
            {SCRIPT_STYLES.map((s) => (
              <div
                key={s.id}
                className="flex aspect-[3/4] w-36 shrink-0 flex-col justify-between rounded border border-border bg-card p-4"
                style={{
                  fontFamily: s.id === "zhuanshu" || s.id === "lishu" ? "serif" : undefined,
                }}
              >
                <span
                  className="font-display text-6xl leading-none"
                  style={{
                    letterSpacing: s.id === "caoshu" ? "-0.1em" : undefined,
                    fontStyle: s.id === "xingshu" || s.id === "caoshu" ? "italic" : undefined,
                    opacity: s.id === "caoshu" ? 0.85 : 1,
                  }}
                >
                  {c.character}
                </span>
                <div>
                  <p className="text-xs font-bold">{s.pinyin}</p>
                  <p className="text-[10px] text-muted-foreground">{s.english}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Style Recommendation
          </h2>
          <div className="rounded-sm border border-jade/20 bg-jade/5 p-4 text-sm leading-relaxed">
            <p className="mb-2 font-latin font-bold text-jade">Best for beginners</p>
            <p className="text-ink/80">
              Start with <strong>Kaishu (Regular Script)</strong> — its clear structure and
              upright strokes make {c.character}'s form easiest to internalize. Move to{" "}
              <strong>Xingshu</strong> once the basic proportions feel natural.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Practice
          </h2>
          <Link
            to="/practice"
            className="block rounded-sm bg-ink p-5 text-paper"
          >
            <p className="font-latin text-lg font-bold">Trace {c.character} →</p>
            <p className="mt-1 text-xs text-paper/60">Open the practice canvas</p>
          </Link>
        </section>

        <section className="space-y-3 pt-4">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Continue
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {others.map((o) => (
              <Link
                key={o.id}
                to="/characters/$id"
                params={{ id: o.id }}
                className="flex aspect-square items-center justify-center rounded border border-border bg-card font-display text-3xl transition hover:border-cinnabar"
              >
                {o.character}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
