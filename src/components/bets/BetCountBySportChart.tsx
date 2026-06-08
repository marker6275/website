"use client";

import { PieChartCard } from "./PieChartCard";
import { getBetChartColor } from "@/utils";
import { getBetSports, getCompletedBets } from "./BetUtils";
import { BetChartProps } from "@/types/components";

export function BetCountBySportChart({ data }: BetChartProps) {
  const completedBets = getCompletedBets(data);

  const sports = [
    ...new Set(completedBets.flatMap((bet) => getBetSports(bet))),
  ];

  const items = sports
    .map((sport) => {
      const value = completedBets.filter((bet) =>
        getBetSports(bet).includes(sport),
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
      totalDisplayValue={String(completedBets.length)}
      items={items}
    />
  );
}
