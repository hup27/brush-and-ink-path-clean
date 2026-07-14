import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getCalligrapher, getScript } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/calligraphers/$id")({
  loader: ({ params }) => {
    const c = getCalligrapher(params.id);
    if (!c) throw notFound();
    return { calligrapher: c };
  },
  component: CalligrapherDetail,
});

function CalligrapherDetail() {
  const { calligrapher: c } = Route.useLoaderData();
  const style = getScript(c.signatureStyle);
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-10 px-6 pb-8 pt-6">
        <Link
          to="/calligraphers"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <ChevronLeft className="size-3" /> Masters
        </Link>

        <section className="animate-reveal-ink space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
                {c.dynasty} Dynasty · {c.years}
              </span>
              <h1 className="mt-1 font-latin text-3xl font-bold italic leading-tight">
                {c.name}
              </h1>
              <p className="mt-1 font-display text-2xl text-muted-foreground">
                {c.chinese}
              </p>
            </div>
            <FavoriteButton kind="calligrapher" id={c.id} />
          </div>

          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-sm bg-card ring-1 ring-black/5">
            <span className="font-display text-[10rem] leading-none opacity-90">
              {c.chinese[0]}
            </span>
            <div className="absolute right-4 top-4 grid size-10 place-items-center bg-cinnabar font-display text-xs leading-none text-paper">
              印
            </div>
          </div>

          {c.epithet && (
            <p className="border-l-2 border-cinnabar bg-card p-4 font-latin italic">
              {c.epithet}
            </p>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Biography
          </h2>
          <p className="text-pretty text-sm leading-relaxed">{c.bio}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Signature Style
          </h2>
          <div className="rounded-sm border border-border bg-card p-5">
            <div className="mb-3 flex items-baseline gap-3">
              <span className="font-display text-3xl">{style?.chinese}</span>
              <span className="font-latin text-lg font-bold">{style?.pinyin}</span>
              <span className="text-xs text-muted-foreground">{style?.english}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {style?.description}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Representative Works
          </h2>
          <ul className="divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
            {c.works.map((w: string) => (
              <li key={w} className="p-4 font-latin text-sm">
                {w}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
