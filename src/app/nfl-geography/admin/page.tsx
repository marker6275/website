"use client";

import { useEffect, useMemo, useState } from "react";
import { USMap, type Point } from "@/components/nfl-geography";
import type { NflGeographyTeam } from "@/lib/nfl-geography/store";

export default function NflGeographyAdminPage() {
  const [teams, setTeams] = useState<NflGeographyTeam[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/nfl-geography/api/")
      .then((r) => r.json())
      .then((data: NflGeographyTeam[]) => {
        setTeams(data);
        const firstUnplotted = data.find((t) => t.x == null);
        setSelectedId(firstUnplotted?.id ?? data[0]?.id ?? null);
        setLoading(false);
      });
  }, []);

  const plottedCount = useMemo(
    () => teams.filter((t) => t.x != null).length,
    [teams],
  );

  const selected = teams.find((t) => t.id === selectedId) ?? null;

  const markers = teams
    .filter((t) => t.x != null && t.id !== selectedId)
    .map((t) => ({
      x: t.x as number,
      y: t.y as number,
      color: "#9ca3af",
      label: t.id,
    }));

  async function handlePick(p: Point) {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/nfl-geography/api/${selected.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const updated: NflGeographyTeam = await res.json();
    setTeams((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSaving(false);

    const idx = teams.findIndex((t) => t.id === selected.id);
    const next = teams
      .slice(idx + 1)
      .concat(teams.slice(0, idx))
      .find((t) => t.x == null);
    if (next) setSelectedId(next.id);
  }

  if (loading) {
    return <div className="p-8 text-neutral-500">Loading teams…</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl mx-auto w-full">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-3">
          <h1 className="text-2xl font-semibold">Plot team locations</h1>
          <span className="text-base text-neutral-500">
            {plottedCount} / {teams.length} plotted
          </span>
        </div>
        <p className="text-base text-neutral-500 mb-4">
          {selected ? (
            <>
              Click the map where the{" "}
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {selected.name}
              </span>{" "}
              are located.
            </>
          ) : (
            "All teams plotted."
          )}
          {saving && <span className="ml-2">Saving…</span>}
        </p>
        <USMap
          onPick={handlePick}
          guess={
            selected?.x != null
              ? { x: selected.x as number, y: selected.y as number }
              : undefined
          }
          markers={markers}
        />
      </div>

      <div className="w-full md:w-72 shrink-0">
        <h2 className="text-base font-semibold text-neutral-500 mb-2">Teams</h2>
        <ul className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          {teams.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left px-4 py-2 rounded text-base flex items-center justify-between gap-2 ${
                  t.id === selectedId
                    ? "bg-blue-600 text-white"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{t.name}</span>
                {t.x != null && (
                  <span
                    className={`text-sm ${
                      t.id === selectedId
                        ? "text-blue-100"
                        : "text-green-600 dark:text-green-500"
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
