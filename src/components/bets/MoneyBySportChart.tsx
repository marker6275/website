"use client";

import { PieChartCard } from "./PieChartCard";
import { getBetChartColor } from "../../utils";

interface MoneyBySportChartProps {
  data: any[];
}

export function MoneyBySportChart({ data }: MoneyBySportChartProps) {
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
      const value = data
        .filter((bet) =>
          String(bet[5] || "")
            .split(",")
            .map((entry: string) => entry.trim())
            .includes(sport)
        )
        .reduce(
          (sum, bet) =>
            sum + parseFloat(String(bet[1] || "0").replace(/^\$/, "")),
          0
        );

      return {
        label: sport,
        value,
        color: getBetChartColor(sport),
        displayValue: `$${value.toFixed(2)}`,
      };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <PieChartCard
      title="Money Wagered By Sport"
      totalLabel="Amounts"
      emptyMessage="Add bets to see how much money is allocated to each sport."
      totalDisplayValue={`$${items
        .reduce((sum, item) => sum + item.value, 0)
        .toFixed(2)}`}
      items={items}
    />
  );
}
