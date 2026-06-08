"use client";

import { BetCard } from ".";
import { useState } from "react";
import { useSafeMediaQuery } from "@/hooks";
import type { OpenBetsSectionProps } from "@/types/components";

export function OpenBetsSection({
  openBets,
  editable,
  setEditedBets,
}: OpenBetsSectionProps) {
  const isMobile = useSafeMediaQuery("(max-width: 1023px)");

  const [showSection, setShowSection] = useState(true);

  function handleMobileCheck() {
    return isMobile ? setShowSection(!showSection) : null;
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <span
        className="shrink-0 text-center py-4 rounded-lg font-semibold text-md lg:text-lg border-3 border-yellow-400 bg-yellow-100"
        onClick={handleMobileCheck}
      >
        Open Bets ({openBets.length})
      </span>
      {showSection && (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain">
          {openBets.length > 0 ? (
            openBets.map((value, index) => (
              <BetCard
                key={index}
                date={value[0] as string}
                amount={value[1] as string}
                odds={value[2] as string}
                result={value[3] as string}
                payout={value[4] as string}
                league={value[5] as string}
                line={value[6] as string}
                index={value[7] as number}
                editable={editable}
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
