import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { CHARACTERS } from "@/lib/data";
import { ChevronLeft, Download, Eraser, Redo2, Undo2 } from "lucide-react";

export const Route = createFileRoute("/practice")({
  component: PracticePage,
});

interface Stroke {
  points: { x: number; y: number; p: number }[];
  size: number;
  erase: boolean;
}

function PracticePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tracing, setTracing] = useState<string | null>("永");
  const [brush, setBrush] = useState(14);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const currentRef = useRef<Stroke | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * ratio;
    c.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  const render = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const rect = c.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // tracing overlay
    if (tracing) {
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#1a1a1a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${Math.min(rect.width, rect.height) * 0.85}px "Ma Shan Zheng", serif`;
      ctx.fillText(tracing, rect.width / 2, rect.height / 2);
      ctx.restore();
    }

    for (const s of strokes) drawStroke(ctx, s);
    if (currentRef.current) drawStroke(ctx, currentRef.current);
  };

  const drawStroke = (ctx: CanvasRenderingContext2D, s: Stroke) => {
    if (s.points.length < 2) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (s.erase) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.strokeStyle = "#0f0f0f";
    }
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (let i = 1; i < s.points.length; i++) {
      const p = s.points[i];
      const w = s.size * (0.6 + p.p * 0.8);
      ctx.lineWidth = w;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    ctx.restore();
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      p: e.pressure && e.pressure !== 0.5 ? e.pressure : 0.5,
    };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    currentRef.current = {
      points: [getPos(e)],
      size: brush,
      erase: tool === "eraser",
    };
    render();
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!currentRef.current) return;
    currentRef.current.points.push(getPos(e));
    render();
  };
  const onUp = () => {
    if (!currentRef.current) return;
    setStrokes((s) => [...s, currentRef.current!]);
    setRedoStack([]);
    currentRef.current = null;
  };

  const undo = () => {
    setStrokes((s) => {
      if (!s.length) return s;
      setRedoStack((r) => [...r, s[s.length - 1]]);
      return s.slice(0, -1);
    });
  };
  const redo = () => {
    setRedoStack((r) => {
      if (!r.length) return r;
      setStrokes((s) => [...s, r[r.length - 1]]);
      return r.slice(0, -1);
    });
  };
  const clear = () => {
    setStrokes([]);
    setRedoStack([]);
  };
  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const link = document.createElement("a");
    link.download = `shuyun-${tracing ?? "practice"}-${Date.now()}.png`;
    link.href = c.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracing, brush]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-md space-y-6 px-6 pb-8 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <ChevronLeft className="size-3" /> Home
        </Link>

        <header className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-tighter text-cinnabar">
            Practice · 练习
          </span>
          <h1 className="font-latin text-3xl font-bold italic tracking-tight">
            Brush canvas
          </h1>
          <p className="text-sm text-muted-foreground">
            Trace with your finger, stylus, or mouse. Pressure-sensitive.
          </p>
        </header>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Trace character
          </p>
          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
            <button
              onClick={() => setTracing(null)}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase transition ${
                !tracing
                  ? "border-ink bg-ink text-paper"
                  : "border-border text-muted-foreground"
              }`}
            >
              Blank
            </button>
            {CHARACTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setTracing(c.character);
                  clear();
                }}
                className={`grid size-11 shrink-0 place-items-center rounded-full border font-display text-2xl transition ${
                  tracing === c.character
                    ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                    : "border-border"
                }`}
              >
                {c.character}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-sm bg-card shadow-sm ring-1 ring-black/5">
          <canvas
            ref={canvasRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="block aspect-square w-full touch-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "50% 50%",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            <button
              onClick={() => setTool("brush")}
              className={`rounded-md border px-3 py-2 font-mono text-[10px] uppercase tracking-widest ${
                tool === "brush"
                  ? "border-ink bg-ink text-paper"
                  : "border-border text-muted-foreground"
              }`}
            >
              Brush
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`rounded-md border px-3 py-2 ${
                tool === "eraser"
                  ? "border-ink bg-ink text-paper"
                  : "border-border text-muted-foreground"
              }`}
              aria-label="Eraser"
            >
              <Eraser className="size-4" />
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={undo}
              disabled={!strokes.length}
              className="rounded-md border border-border p-2 text-muted-foreground disabled:opacity-40"
              aria-label="Undo"
            >
              <Undo2 className="size-4" />
            </button>
            <button
              onClick={redo}
              disabled={!redoStack.length}
              className="rounded-md border border-border p-2 text-muted-foreground disabled:opacity-40"
              aria-label="Redo"
            >
              <Redo2 className="size-4" />
            </button>
            <button
              onClick={clear}
              className="rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground"
            >
              Clear
            </button>
            <button
              onClick={download}
              className="rounded-md border border-cinnabar bg-cinnabar p-2 text-paper"
              aria-label="Download"
            >
              <Download className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Brush thickness
            </label>
            <span className="font-mono text-[10px] text-muted-foreground">{brush}px</span>
          </div>
          <input
            type="range"
            min={4}
            max={40}
            value={brush}
            onChange={(e) => setBrush(Number(e.target.value))}
            className="w-full accent-cinnabar"
          />
        </div>
      </main>
    </>
  );
}
