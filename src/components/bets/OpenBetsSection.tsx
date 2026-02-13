"use client";

import { BetCard } from ".";
import { useState } from "react";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";
import type { OpenBetsSectionProps } from "../../types/components/bets";

export function OpenBetsSection({
  openBets,
  editable,
  editedBets,
  setEditedBets,
}: OpenBetsSectionProps) {
  const isMobile = useSafeMediaQuery("(max-width: 1023px)");

  const [showSection, setShowSection] = useState(true);

  function handleMobileCheck() {
    return isMobile ? setShowSection(!showSection) : null;
  }

  return (
    <div className="flex flex-col gap-4">
      <span
        className="text-center py-4 rounded-lg font-semibold text-md lg:text-lg border-3 border-yellow-400 bg-yellow-100"
        onClick={handleMobileCheck}
      >
        Open Bets ({openBets.length})
      </span>
      {showSection && (
        <div className="space-y-3 max-h-[75vh] overflow-y-scroll">
          {openBets.length > 0 ? (
            openBets.map((value, index) => (
              <BetCard
                key={index}
                date={value[0]}
                amount={value[1]}
                odds={value[2]}
                result={value[3]}
                payout={value[4]}
                league={value[5]}
                line={value[6]}
                editable={editable}
                index={value[7]}
                editedBets={editedBets}
                setEditedBets={setEditedBets}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">No open bets</div>
          )}
        </div>
      )}
    </div>
  );
}

