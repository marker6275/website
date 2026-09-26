"use client";

import { SportDataCard } from ".";
import { useEffect, useMemo, useState } from "react";
import { BetSortSelect } from "./BetSortSelect";
import { BetResults, compareBetStats } from "./BetUtils";
import type { BetSortMode, BetsBySportDropdownProps } from "@/types/components";

export function BetsBySportDropdown({
  uniqueSports,
  data,
  getNetProfit,
  getBetsBySport,
  onLayoutChange,
}: BetsBySportDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortMode, setSortMode] = useState<BetSortMode>("profit");
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    onLayoutChange?.();

    const timeoutId = window.setTimeout(() => {
      onLayoutChange?.();
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [onLayoutChange, showDropdown, uniqueSports.length]);

  const getTotalSpent = (bets: any[]): string => {
    return bets
      .reduce((acc, bet) => acc + parseFloat(bet[1].replace(/^\$/, "")), 0)
      .toFixed(2);
  };

  const sortedSports = useMemo(
    () =>
      uniqueSports
        .map((sport) => {
          const bets = getBetsBySport(data, sport);
          return {
            name: sport,
            settled: bets.filter((bet) => bet[3] !== BetResults.Open).length,
            won: bets.filter((bet) => bet[3] === BetResults.Won).length,
            netProfit: getNetProfit(bets),
            totalSpent: parseFloat(getTotalSpent(bets)),
          };
        })
        .sort((a, b) => compareBetStats(a, b, sortMode) * (reversed ? -1 : 1))
        .map((stats) => stats.name),
    [uniqueSports, data, getBetsBySport, getNetProfit, sortMode, reversed],
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
            setSortMode={setSortMode}
            reversed={reversed}
            setReversed={setReversed}
          />
        )}
        Data by Sport
      </div>
      {showDropdown && (
        <div className="flex flex-col gap-2 mt-4 max-h-[36vh] overflow-y-scroll">
          {sortedSports.map((sport) => (
            <SportDataCard
              key={sport}
              bets={getBetsBySport(data, sport)}
              sport={sport}
              netProfit={getNetProfit(getBetsBySport(data, sport))}
              totalSpent={getTotalSpent(getBetsBySport(data, sport))}
              profit={getNetProfit(getBetsBySport(data, sport)) >= 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
