"use client";

import { BetCard, BetResults } from ".";
import { useSafeMediaQuery } from "@/hooks";
import { useState } from "react";
import type { Last10BetsSectionProps } from "@/types/components";

export function Last10BetsSection({
  getCompletedBets,
  last10Bets,
  editable,
  setEditedBets,
}: Last10BetsSectionProps) {
  const isMobile = useSafeMediaQuery("(max-width: 1023px)");

  const [showSection, setShowSection] = useState(true);

  function handleMobileCheck() {
    return isMobile ? setShowSection(!showSection) : null;
  }

  const getWonBets = (bets: any[]): number => {
    return bets.filter((bet) => bet[3] === BetResults.Won).length;
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <span
        className="shrink-0 text-center py-4 rounded-lg font-semibold text-md lg:text-lg border-3 border-blue-400 bg-blue-100"
        onClick={handleMobileCheck}
      >
        Last 10 Bets ({getWonBets(last10Bets)} /{" "}
        {getCompletedBets(last10Bets).length})
        {getCompletedBets(last10Bets).length < 10 && (
          <span> - [{10 - getCompletedBets(last10Bets).length} open]</span>
        )}
      </span>
      {showSection && (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain">
          {last10Bets.length > 0 ? (
            last10Bets.map((value, index) => (
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
            <div className="text-gray-500 text-center py-8">No bets found</div>
          )}
        </div>
      )}
    </div>
  );
}
