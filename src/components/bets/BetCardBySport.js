import { BetResults } from "./BetTypes";

export function BetCardBySport({ bets, sport, netProfit, totalSpent, profit }) {
  return (
    <div
      className={`bg-gray-100/50 rounded-lg py-2 px-4 flex justify-between hover:bg-gray-200/60 transition-all duration-300 ${
        profit ? "border-2 border-green-400" : "border-2 border-red-400"
      }`}
    >
      <div>
        <div className="text-lg font-semibold">{sport}</div>
        <div className="flex flex-col gap-2">
          {bets.filter((bet) => bet[3] === BetResults.Won).length} /{" "}
          {bets.length} Won (
          {(
            (bets.filter((bet) => bet[3] === BetResults.Won).length /
              bets.length) *
            100
          ).toFixed(0)}
          %)
        </div>
      </div>
      <div>
        <div>Net Profit: ${netProfit}</div>
        <div>Total Spent: ${totalSpent}</div>
      </div>
    </div>
  );
}
