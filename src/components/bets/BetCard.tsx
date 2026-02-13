"use client";

import { useState } from "react";
import { BetResults } from "./BetUtils";
import type { BetCardProps } from "../../types/components/bets";

export function BetCard({
  date,
  amount,
  odds,
  result,
  payout,
  league,
  line,
  index,
  editable,
  editedBets,
  setEditedBets,
}: BetCardProps) {
  const results: string[] = [
    BetResults.Lost,
    BetResults.Won,
    BetResults.Cashed,
    BetResults.Open,
  ];

  const [editResult, setEditResult] = useState<{
    result: string;
    index: number;
    payout: string;
  }>({
    result: result,
    index: results.indexOf(result),
    payout: payout,
  });

  const formatCurrency = (value: string, result: boolean, lostOrCashed: boolean): string => {
    const num = parseFloat(value);
    if (result && lostOrCashed) {
      return "$0.00";
    }

    return isNaN(num) ? value : `$${num.toFixed(2)}`;
  };

  const formatOdds = (odds: string): string => {
    const num = parseInt(odds);
    return isNaN(num) ? odds : num > 0 ? `+${num}` : `${num}`;
  };

  const getResultColor = (result: string): string => {
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
      const res =
        results[
          editResult.index + 1 === results.length ? 0 : editResult.index + 1
        ];
      setEditResult({
        result: res,
        index:
          editResult.index + 1 === results.length ? 0 : editResult.index + 1,
        payout: editResult.payout,
      });

      const updateEditedBets = [
        date,
        amount,
        odds,
        res,
        formatCurrency(
          payout,
          true,
          res === BetResults.Lost || res === BetResults.Cashed
        ),
        league,
        line,
        index,
      ];

      setEditedBets((prev) => {
        const copy = [...prev];
        const betIndex = copy.findIndex((item) => item[7] === index);
        if (betIndex !== -1) {
          copy[betIndex] = updateEditedBets;
        } else {
          copy.push(updateEditedBets);
        }
        if (updateEditedBets[3] === result) {
          if (betIndex === -1) {
            return prev;
          }
          return copy.filter((item) => item[7] !== index);
        } else {
          return copy;
        }
      });
    }
  }

  return (
    <div
      className={`w-full p-2 rounded-lg border-4 ${getResultColor(
        editResult.result
      )} hover:shadow-sm transition-all duration-300`}
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
        <span className="font-medium">
          {formatCurrency(
            amount,
            false,
            editResult.result === BetResults.Lost ||
              editResult.result === BetResults.Cashed
          )}
        </span>
        <span className="font-medium">{formatOdds(odds)}</span>
      </div>
      <div className="text-md">
        <div className="flex justify-end">
          <span
            className="font-medium border-1 p-1 rounded-md"
            contentEditable={
              editResult.result === BetResults.Cashed && editable
            }
            onInput={(e: React.FormEvent<HTMLSpanElement>) => {
              setEditResult({ ...editResult, payout: e.currentTarget.textContent || "" });
            }}
            dangerouslySetInnerHTML={{
              __html: formatCurrency(
                editResult.result === BetResults.Open ||
                  editResult.result === BetResults.Won
                  ? payout
                  : editResult.payout,
                true,
                editResult.result === BetResults.Lost ||
                  editResult.result === BetResults.Cashed
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

