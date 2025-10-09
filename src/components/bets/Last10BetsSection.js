"use client";

import { BetCard, BetResults } from ".";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";
import { useState } from "react";

export function Last10BetsSection({
  getCompletedBets,
  last10Bets,
  editable,
  editedBets,
  setEditedBets,
}) {
  const isMobile = useSafeMediaQuery("(max-width: 1023px)");

  const [showSection, setShowSection] = useState(true);

  function handleMobileCheck() {
    return isMobile ? setShowSection(!showSection) : null;
  }

  const getWonBets = (bets) => {
    return bets.filter((bet) => bet[3] === BetResults.Won).length;
  };

  return (
    <div className="flex flex-col gap-4">
      <span
        className="text-center py-4 rounded-lg font-semibold text-md lg:text-lg border-3 border-blue-400 bg-blue-100"
        onClick={handleMobileCheck}
      >
        Last 10 Bets ({getWonBets(last10Bets)} /{" "}
        {getCompletedBets(last10Bets).length})
        {getCompletedBets(last10Bets).length < 10 && (
          <span> - [{10 - getCompletedBets(last10Bets).length} open]</span>
        )}
      </span>
      {showSection && (
        <div className="space-y-3 max-h-[75vh] overflow-y-auto">
          {last10Bets.length > 0 ? (
            last10Bets.map((value, index) => (
              <BetCard
                key={index}
                date={value[0]}
                amount={value[1]}
                odds={value[2]}
                result={value[3]}
                payout={value[4]}
                league={value[5]}
                line={value[6]}
                index={value[7]}
                editable={editable}
                editedBets={editedBets}
                setEditedBets={setEditedBets}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">No bets found</div>
          )}
        </div>
      )}
    </div>
  );
}
