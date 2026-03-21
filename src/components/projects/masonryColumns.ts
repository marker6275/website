import { useEffect, useMemo, useState } from "react";

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

export function useMasonryColumnCount(): 1 | 2 | 3 | null {
  const [columnCount, setColumnCount] = useState<1 | 2 | 3 | null>(null);

  useEffect(() => {
    const update = () => setColumnCount(readColumnCount());
    update();
    return subscribeToColumnCount(update);
  }, []);

  return columnCount;
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
