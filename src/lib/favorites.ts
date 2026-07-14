import { useEffect, useState } from "react";

export type FavoriteKind = "character" | "calligrapher" | "style" | "quote";

export interface Favorite {
  kind: FavoriteKind;
  id: string;
  addedAt: number;
}

const KEY = "shuyun.favorites.v1";

function read(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(list: Favorite[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("shuyun:favorites"));
}

export function useFavorites() {
  const [list, setList] = useState<Favorite[]>([]);

  useEffect(() => {
    setList(read());
    const handler = () => setList(read());
    window.addEventListener("shuyun:favorites", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("shuyun:favorites", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const isFavorite = (kind: FavoriteKind, id: string) =>
    list.some((f) => f.kind === kind && f.id === id);

  const toggle = (kind: FavoriteKind, id: string) => {
    const current = read();
    const exists = current.some((f) => f.kind === kind && f.id === id);
    const next = exists
      ? current.filter((f) => !(f.kind === kind && f.id === id))
      : [...current, { kind, id, addedAt: Date.now() }];
    write(next);
  };

  return { favorites: list, isFavorite, toggle };
}
