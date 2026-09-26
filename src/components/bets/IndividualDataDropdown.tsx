"use client";

import { useEffect, useMemo, useState } from "react";
import { IndividualDataCard } from "./IndividualDataCard";
import { BetSortSelect } from "./BetSortSelect";
import {
  BetResults,
  compareBetStats,
  getBetWagerAmount,
  getLegIndividuals,
  splitLines,
} from "./BetUtils";
import type {
  BetSortMode,
  IndividualDataDropdownProps,
  IndividualStats,
} from "@/types/components";

const PAGE_SIZE = 20;

export function IndividualDataDropdown({
  data,
  onLayoutChange,
}: IndividualDataDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortMode, setSortMode] = useState<BetSortMode>("profit");
  const [reversed, setReversed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    onLayoutChange?.();

    const timeoutId = window.setTimeout(() => {
      onLayoutChange?.();
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [onLayoutChange, showDropdown, visibleCount]);

  const individuals = useMemo(() => {
    const stats = new Map<string, IndividualStats>();

    data.forEach((bet) => {
      if (bet[3] === BetResults.Open) {
        return;
      }

      const wager = getBetWagerAmount(bet);
      const names = new Map(
        splitLines(bet[6])
          .flatMap(getLegIndividuals)
          .map((name): [string, string] => [name.toLowerCase(), name]),
      );

      names.forEach((name, key) => {
        const entry = stats.get(key) || {
          name,
          settled: 0,
          won: 0,
          netProfit: 0,
          totalSpent: 0,
        };

        entry.settled += 1;
        entry.totalSpent += wager;
        entry.netProfit +=
          parseFloat(String(bet[4] || "0").replace(/^\$/, "")) - wager;
        if (bet[3] === BetResults.Won) {
          entry.won += 1;
        }

        stats.set(key, entry);
      });
    });

    return [...stats.values()];
  }, [data]);

  const sortedIndividuals = useMemo(
    () =>
      [...individuals].sort(
        (a, b) => compareBetStats(a, b, sortMode) * (reversed ? -1 : 1),
      ),
    [individuals, sortMode, reversed],
  );

  return (
    <div
      className="cursor-pointer rounded-lg border bg-white px-4 py-4 shadow-sm transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="relative text-center font-semibold text-lg">
        {showDropdown && (
          <BetSortSelect
            sortMode={sortMode}
            setSortMode={(mode) => {
              setSortMode(mode);
              setVisibleCount(PAGE_SIZE);
            }}
            reversed={reversed}
            setReversed={(value) => {
              setReversed(value);
              setVisibleCount(PAGE_SIZE);
            }}
          />
        )}
        Data by Individual
      </div>
      {showDropdown && (
        <div className="flex flex-col gap-2 mt-4 max-h-[36vh] overflow-y-scroll">
          {sortedIndividuals.slice(0, visibleCount).map((individual) => (
            <IndividualDataCard key={individual.name} individual={individual} />
          ))}
          {visibleCount < sortedIndividuals.length && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setVisibleCount(visibleCount + PAGE_SIZE);
              }}
              className="rounded-lg border border-gray-300 bg-gray-100 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-white"
            >
              Show More ({sortedIndividuals.length - visibleCount} left)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
