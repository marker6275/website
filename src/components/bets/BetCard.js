"use client";

import { useState } from "react";
import { BetResults } from "./BetUtils";

export function BetCard({
  date,
  amount,
  odds,
  result,
  payout,
  league,
  line,
  editable,
}) {
  const results = [
    BetResults.Lost,
    BetResults.Won,
    BetResults.Cashed,
    BetResults.Open,
  ];
  const [editResult, setEditResult] = useState({
    result: result,
    index: results.indexOf(result),
    payout: payout,
  });

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (editResult.result === BetResults.Lost) {
      return "$0.00";
    }

    if (editResult.result === BetResults.Cashed) {
      return "$0.00";
    }

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
      return "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200/60 hover:border-blue-400";
    }

    return "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200/60 hover:border-yellow-400";
  };

  function handleEdit() {
    if (editable) {
      setEditResult({
        result:
          results[
            editResult.index + 1 === results.length ? 0 : editResult.index + 1
          ],
        index:
          editResult.index + 1 === results.length ? 0 : editResult.index + 1,
      });
    }
  }

  return (
    <div
      className={`w-full p-2 rounded-lg border-4 ${getResultColor(
        editResult.result
      )} cursor-pointer hover:shadow-sm transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <span className="font-bold">{league}</span>
          <div className="text-sm font-light">({date})</div>
        </div>
        <div
          className={`px-4 py-2 rounded text-xs font-semibold ${
            editResult.result === BetResults.Won
              ? "bg-green-200"
              : editResult.result === BetResults.Lost
              ? "bg-red-200"
              : editResult.result === BetResults.Cashed
              ? "bg-blue-200"
              : "bg-yellow-200"
          }`}
          onClick={() => handleEdit()}
        >
          {editResult.result || result}
        </div>
      </div>

      <div className="flex justify-between my-1">
        <span className="font-medium">{formatCurrency(amount)}</span>
        <span className="font-medium">{formatOdds(odds)}</span>
      </div>

      <div className="text-md">
        <div className="flex justify-end">
          <span
            className="font-medium border-1 p-1 rounded-md"
            contentEditable={
              editResult.result === BetResults.Cashed && editable
            }
            onInput={(e) => {
              setEditResult({ ...editResult, payout: e.target.value });
            }}
            dangerouslySetInnerHTML={{
              __html: formatCurrency(
                editResult.result === BetResults.Open ||
                  editResult.result === BetResults.Won
                  ? payout
                  : editResult.payout
              ),
            }}
          ></span>
        </div>

        <div className="flex justify-end">
          <div className="text-sm text-black mt-1 text-right">
            {line.split(/\r?\n/).map((line, i) => {
              return <div key={i}>{line}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
