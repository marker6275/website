"use client";

import { PieChartCard } from "./PieChartCard";
import { getBetChartColor } from "../../utils";

interface BetCountBySportChartProps {
  data: any[];
}

export function BetCountBySportChart({ data }: BetCountBySportChartProps) {
  const sports = [
    ...new Set(
      data.flatMap((bet) =>
        String(bet[5] || "")
          .split(",")
          .map((sport: string) => sport.trim())
          .filter(Boolean)
      )
    ),
  ];

  const items = sports
    .map((sport) => {
      const value = data.filter((bet) =>
        String(bet[5] || "")
          .split(",")
          .map((entry: string) => entry.trim())
          .includes(sport)
      ).length;

      return {
        label: sport,
        value,
        color: getBetChartColor(sport),
        displayValue: `${value} bets`,
      };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <PieChartCard
      title="Bet Count By Sport"
      totalLabel="Bets"
      emptyMessage="Add bets to see how many bets were made for each sport."
      totalDisplayValue={String(items.reduce((sum, item) => sum + item.value, 0))}
      items={items}
    />
  );
}
