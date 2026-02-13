"use client";

import { useState } from "react";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";
import { BetsBySportDropdown, BetResults } from ".";
import type { ProfitsAndStatisticsSectionProps } from "../../types/components/bets";

export function ProfitsAndStatisticsSection({
  profits,
  showDropdown,
  uniqueSports,
  data,
}: ProfitsAndStatisticsSectionProps) {
  const isMobile = useSafeMediaQuery("(max-width: 1023px)");
  const [showSection, setShowSection] = useState(true);

  function handleMobileCheck() {
    return isMobile ? setShowSection(!showSection) : null;
  }

  const getNetProfit = (bets: any[]): number => {
    const completedBets = bets.filter((bet) => bet[3] !== BetResults.Open);
    const amountSpent = completedBets.reduce(
      (acc, bet) => acc + parseFloat(bet[1].replace(/^\$/, "")),
      0
    );
    const amountReturned = completedBets.reduce(
      (acc, bet) => acc + parseFloat(bet[4].replace(/^\$/, "")),
      0
    );
    return parseFloat((amountReturned - amountSpent).toFixed(2));
  };

  const getBetsBySport = (data: any[], sport: string): any[] => {
    return data.filter(
      (bet) =>
        bet[5]
          .split(",")
          .map((s: string) => s.trim())
          .includes(sport) && bet[3]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <span
        className="text-center py-4 rounded-lg font-semibold text-md lg:text-lg border-3 border-green-400 bg-green-100"
        onClick={handleMobileCheck}
      >
        Profits & Statistics
      </span>

      {showSection && (
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                ${profits.totalWagered.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Wagered</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                ${profits.totalReturn.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Return</div>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-center gap-20">
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  profits.profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {profits.profit >= 0 ? "+" : ""}${profits.profit.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Net Profit/Loss</div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  profits.lastDayProfit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {profits.lastDayProfit >= 0 ? "+" : ""}$
                {profits.lastDayProfit.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{profits.lastDay}</span>{" "}
                Profit/Loss
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-800">
                {profits.winRate}%
              </div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>

            <div className="text-center">
              <div className="text-xl font-semibold text-gray-800">
                {profits.totalBets}
              </div>
              <div className="text-sm text-gray-600">Total Bets</div>
            </div>
          </div>
        </div>
      )}

      <BetsBySportDropdown
        uniqueSports={uniqueSports}
        data={data}
        getNetProfit={getNetProfit}
        getBetsBySport={getBetsBySport}
      />
    </div>
  );
}

