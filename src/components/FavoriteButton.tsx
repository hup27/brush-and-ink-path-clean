import { Heart } from "lucide-react";
import { useFavorites, type FavoriteKind } from "@/lib/favorites";

export function FavoriteButton({
  kind,
  id,
  className = "",
}: {
  kind: FavoriteKind;
  id: string;
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(kind, id);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      onClick={() => toggle(kind, id)}
      className={`rounded-full border border-border p-2 transition-colors hover:bg-ink hover:text-paper ${
        active ? "bg-ink text-paper" : ""
      } ${className}`}
    >
      <Heart className="size-4" fill={active ? "currentColor" : "none"} strokeWidth={1.5} />
    </button>
  );
}
