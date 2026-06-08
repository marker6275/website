"use client";

import { PieChartCard } from "./PieChartCard";
import { getBetChartColor } from "@/utils";
import { getBetSports, getBetWagerAmount, getCompletedBets } from "./BetUtils";
import { BetChartProps } from "@/types/components";

export function MoneyBySportChart({ data }: BetChartProps) {
  const completedBets = getCompletedBets(data);

  const sports = [
    ...new Set(completedBets.flatMap((bet) => getBetSports(bet))),
  ];

  const items = sports
    .map((sport) => {
      const value = completedBets
        .filter((bet) => getBetSports(bet).includes(sport))
        .reduce((sum, bet) => sum + getBetWagerAmount(bet), 0);

      return {
        label: sport,
        value,
        color: getBetChartColor(sport),
        displayValue: `$${value.toFixed(2)}`,
      };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalWagered = completedBets.reduce(
    (sum, bet) => sum + getBetWagerAmount(bet),
    0,
  );

  return (
    <PieChartCard
      title="Money Wagered By Sport"
      totalLabel="Amounts"
      emptyMessage="Add bets to see how much money is allocated to each sport."
      totalDisplayValue={`$${totalWagered.toFixed(2)}`}
      items={items}
    />
  );
}
