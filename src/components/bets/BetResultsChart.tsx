"use client";

import { BetResults } from "./BetUtils";
import { PieChartCard } from "./PieChartCard";
import { getBetChartColor } from "../../utils";

interface BetResultsChartProps {
  data: any[];
}

export function BetResultsChart({ data }: BetResultsChartProps) {
  const completedBets = data.filter((bet) => bet[3] !== BetResults.Open);

  const items = [BetResults.Won, BetResults.Lost, BetResults.Cashed]
    .map((result) => {
      const value = completedBets.filter((bet) => bet[3] === result).length;

      return {
        label: result,
        value,
        color: getBetChartColor(result),
        displayValue: `${value} bets`,
      };
    })
    .filter((item) => item.value > 0);

  return (
    <PieChartCard
      title="Completed Bet Results"
      totalLabel="Results"
      emptyMessage="Add completed bets to see the win, loss, and cashed breakdown."
      totalDisplayValue={String(items.reduce((sum, item) => sum + item.value, 0))}
      items={items}
    />
  );
}
