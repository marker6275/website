import { useMemo, useSyncExternalStore } from "react";

/** Matches Tailwind `sm` / `lg` defaults (640px / 1024px). */
export function partitionIntoColumns<T>(
  items: readonly T[],
  columnCount: number,
): T[][] {
  const n = Math.max(1, columnCount);
  return Array.from({ length: n }, (_, c) =>
    items.filter((_, i) => i % n === c),
  );
}

function readColumnCount(): 1 | 2 | 3 {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

function subscribeToColumnCount(onChange: () => void): () => void {
  const queries = ["(min-width: 1024px)", "(min-width: 640px)"].map((q) =>
    window.matchMedia(q),
  );
  queries.forEach((mq) => mq.addEventListener("change", onChange));
  return () =>
    queries.forEach((mq) => mq.removeEventListener("change", onChange));
}

/**
 * 1 / 2 / 3 columns aligned with `sm:` / `lg:`.
 * Server snapshot uses 3 so the first paint isn’t a single full-width column (huge thumbnails on /projects).
 */
export function useMasonryColumnCount(): 1 | 2 | 3 {
  return useSyncExternalStore(subscribeToColumnCount, readColumnCount, () => 3);
}

export function usePartitionedProjects<T>(
  items: readonly T[],
  columnCount: number,
): T[][] {
  return useMemo(
    () => partitionIntoColumns(items, columnCount),
    [items, columnCount],
  );
}
