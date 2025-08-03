export function BetCard({ date, amount, odds, result, payout, league, line }) {
  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : `$${num.toFixed(2)}`;
  };

  const formatOdds = (odds) => {
    const num = parseInt(odds);
    return isNaN(num) ? odds : num > 0 ? `+${num}` : `${num}`;
  };

  const getResultColor = (result) => {
    if (result?.toLowerCase() === "won") {
      return "bg-green-100 border-green-300 text-green-800 hover:bg-green-200/60 hover:border-green-400";
    } else if (result?.toLowerCase() === "lost") {
      return "bg-red-100 border-red-300 text-red-800 hover:bg-red-200/60 hover:border-red-400";
    } else if (result?.toLowerCase() === "cashed") {
      return "bg-blue-100 border-yellow-300 text-yellow-800 hover:bg-blue-200/60 hover:border-blue-400";
    }

    return "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200/60 hover:border-yellow-400";
  };

  return (
    <div
      className={`w-full p-2 rounded-lg border-2 ${getResultColor(
        result
      )} cursor-pointer hover:shadow-sm transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <span className="font-bold">{league}</span>
          <div className="text-sm font-light">{date}</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold ${
            result?.toLowerCase() === "won"
              ? "bg-green-200"
              : result?.toLowerCase() === "lost"
              ? "bg-red-200"
              : result?.toLowerCase() === "cashed"
              ? "bg-blue-200"
              : "bg-yellow-200"
          }`}
        >
          {result || "Pending"}
        </div>
      </div>

      {league && (
        <div className="flex justify-between mt-2 mb-1">
          <span className="font-medium">{formatCurrency(amount)}</span>
          <span className="font-medium">{formatOdds(odds)}</span>
        </div>
      )}

      <div className="text-sm">
        <div className="flex justify-end">
          {payout && (
            <span className="font-medium border-1 p-1 rounded-md">
              {formatCurrency(payout)}
            </span>
          )}
        </div>

        <div className="flex justify-end">
          {line && (
            <div className="text-sm text-black mt-1 text-right">
              {line.split(/\r?\n/).map((line, i) => {
                return <div key={i}>{line}</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
