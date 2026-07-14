import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { AppHeader } from "@/components/AppHeader";
import { CHARACTERS, SCRIPT_STYLES, type ScriptType } from "@/lib/data";

const searchSchema = z.object({
  q: z.string().optional(),
  style: z.enum(["kaishu", "xingshu", "caoshu", "lishu", "zhuanshu"]).optional(),
  strokes: z.number().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ, style: initialStyle } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [style, setStyle] = useState<ScriptType | undefined>(initialStyle);
  const [strokeFilter, setStrokeFilter] = useState<number | undefined>();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CHARACTERS.filter((c) => {
      if (strokeFilter && c.strokes !== strokeFilter) return false;
      if (!query) return true;
      return (
        c.character.includes(query) ||
        c.pinyin.toLowerCase().includes(query) ||
        c.meaning.toLowerCase().includes(query)
      );
    });
  }, [q, strokeFilter]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-8 px-6 pb-8 pt-8">
        <header className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
            Archive · 字库
          </span>
          <h1 className="font-latin text-3xl font-bold italic tracking-tight">
            Character database
          </h1>
          <p className="text-sm text-muted-foreground">
            Search by character, pinyin, or English meaning.
          </p>
        </header>

        <div className="space-y-3">
          <div className="relative">
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. 山, shan, mountain"
              className="w-full rounded-md border border-border bg-card px-4 py-3 font-latin text-base outline-none ring-cinnabar/30 transition focus:ring-2"
            />
          </div>

          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
            <button
              onClick={() => setStyle(undefined)}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
                !style
                  ? "border-ink bg-ink text-paper"
                  : "border-border text-muted-foreground"
              }`}
            >
              All Styles
            </button>
            {SCRIPT_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(style === s.id ? undefined : s.id)}
                className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
                  style === s.id
                    ? "border-cinnabar bg-cinnabar text-paper"
                    : "border-border text-muted-foreground hover:border-ink/30"
                }`}
              >
                {s.pinyin}
              </button>
            ))}
          </div>

          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
            <span className="shrink-0 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Strokes:
            </span>
            {[3, 4, 5, 8, 9, 10, 12, 13].map((n) => (
              <button
                key={n}
                onClick={() => setStrokeFilter(strokeFilter === n ? undefined : n)}
                className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] transition ${
                  strokeFilter === n
                    ? "border-ink bg-ink text-paper"
                    : "border-border text-muted-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {results.map((c) => (
              <li key={c.id}>
                <Link
                  to="/characters/$id"
                  params={{ id: c.id }}
                  className="flex aspect-square flex-col justify-between rounded-md border border-border bg-card p-3 transition-colors hover:border-cinnabar"
                >
                  <span className="font-display text-5xl leading-none">
                    {c.character}
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">
                      {c.pinyin}
                    </p>
                    <p className="truncate text-xs">{c.meaning.split(",")[0]}</p>
                  </div>
                </Link>
              </li>
            ))}
            {results.length === 0 && (
              <li className="col-span-2 py-12 text-center text-sm text-muted-foreground">
                No characters match. Try another search.
              </li>
            )}
          </ul>
        </div>

        <div className="border-t border-border pt-6">
          <Link
            to="/calligraphers"
            className="flex items-center justify-between rounded-md bg-ink p-4 text-paper transition hover:bg-ink/85"
          >
            <div>
              <p className="font-latin text-lg font-bold">Master calligraphers</p>
              <p className="text-xs text-paper/60">Browse historical figures</p>
            </div>
            <span className="font-display text-2xl">书</span>
          </Link>
        </div>
      </main>
    </>
  );
}
