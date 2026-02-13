"use client";

import { SportDataCard } from ".";
import { useState } from "react";
import type { BetsBySportDropdownProps } from "../../types/components/bets";

export function BetsBySportDropdown({
  uniqueSports,
  data,
  getNetProfit,
  getBetsBySport,
}: BetsBySportDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getTotalSpent = (bets: any[]): string => {
    return bets
      .reduce((acc, bet) => acc + parseFloat(bet[1].replace(/^\$/, "")), 0)
      .toFixed(2);
  };

  return (
    <div
      className="bg-white rounded-lg py-4 px-4 shadow-sm border cursor-pointer"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="text-center font-semibold text-lg">Data by Sport</div>
      {showDropdown && (
        <div className="flex flex-col gap-2 mt-4 max-h-[36vh] overflow-y-scroll">
          {uniqueSports
            .sort(
              (a, b) =>
                getNetProfit(getBetsBySport(data, b)) -
                getNetProfit(getBetsBySport(data, a))
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

