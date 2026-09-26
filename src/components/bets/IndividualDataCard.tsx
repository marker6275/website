import type { IndividualDataCardProps } from "@/types/components";

export function IndividualDataCard({ individual }: IndividualDataCardProps) {
  const { name, settled, won, netProfit, totalSpent } = individual;

  return (
    <div
      className={`bg-gray-100/50 rounded-lg py-2 px-4 flex justify-between hover:bg-gray-200/60 transition-all duration-300 ${
        netProfit >= 0 ? "border-2 border-green-400" : "border-2 border-red-400"
      }`}
    >
      <div>
        <div className="text-md lg:text-lg font-semibold">{name}</div>
        <div className="text-sm lg:text-lg flex flex-col gap-2">
          {won} / {settled} Won ({((won / settled) * 100).toFixed(0)}%)
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="text-sm lg:text-lg">
          Net Profit:{" "}
          {netProfit < 0
            ? `-$${(netProfit * -1).toFixed(2)}`
            : `+$${netProfit.toFixed(2)}`}
        </div>
        <div className="text-sm lg:text-lg">
          Total Spent: ${totalSpent.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
