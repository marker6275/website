"use client";

import { SportDataCard } from ".";
import { useEffect, useState } from "react";
import type { BetsBySportDropdownProps } from "@/types/components";

export function BetsBySportDropdown({
  uniqueSports,
  data,
  getNetProfit,
  getBetsBySport,
  onLayoutChange,
}: BetsBySportDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <div
      className="cursor-pointer rounded-lg border bg-white px-4 py-4 shadow-sm transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="text-center font-semibold text-lg">Data by Sport</div>
      {showDropdown && (
        <div className="flex flex-col gap-2 mt-4 max-h-[36vh] overflow-y-scroll">
          {uniqueSports
            .sort(
              (a, b) =>
                getNetProfit(getBetsBySport(data, b)) -
                getNetProfit(getBetsBySport(data, a)),
            )
            .map((sport) => (
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
