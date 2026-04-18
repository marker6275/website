"use client";

import { useState } from "react";
import { BetCountBySportChart } from "./BetCountBySportChart";
import { MoneyBySportChart } from "./MoneyBySportChart";
import { BetResultsChart } from "./BetResultsChart";

interface SportAllocationChartSectionProps {
  data: any[];
}

export function SportAllocationChartSection({
  data,
}: SportAllocationChartSectionProps) {
  const [showSection, setShowSection] = useState(false);
  const [chartMode, setChartMode] = useState<"bets" | "money" | "results">(
    "bets"
  );

  return (
    <div
      className="bg-white rounded-lg py-4 px-4 shadow-sm border cursor-pointer"
      onClick={() => setShowSection(!showSection)}
    >
      <div className="text-center font-semibold text-lg">Charts</div>

      {showSection && (
        <div
          className="mt-4 space-y-4 cursor-default"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <div className="inline-flex rounded-full border border-gray-300 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setChartMode("bets")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  chartMode === "bets"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-700"
                }`}
              >
                Bet Count
              </button>
              <button
                type="button"
                onClick={() => setChartMode("money")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  chartMode === "money"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-700"
                }`}
              >
                Money Wagered
              </button>
              <button
                type="button"
                onClick={() => setChartMode("results")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  chartMode === "results"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-700"
                }`}
              >
                Results
              </button>
            </div>
          </div>

          {chartMode === "bets" ? (
            <BetCountBySportChart data={data} />
          ) : chartMode === "money" ? (
            <MoneyBySportChart data={data} />
          ) : (
            <BetResultsChart data={data} />
          )}
        </div>
      )}
    </div>
  );
}
