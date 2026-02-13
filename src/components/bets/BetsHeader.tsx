"use client";

import { BetsInfoModal, BetsButton } from ".";
import { useState } from "react";
import type { BetsHeaderProps } from "../../types/components/bets";

export function BetsHeader({ titleOnClick, addOnClick, editOnClick, mode }: BetsHeaderProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="flex items-center lg:justify-between flex-col lg:flex-row gap-5 w-full px-10 pt-10">
      <div className="flex items-center gap-4 justify-center">
        <div
          className="text-3xl lg:text-4xl font-semibold cursor-pointer"
          onClick={titleOnClick}
        >
          Bets Dashboard
        </div>
        <BetsInfoModal
          showInfoModal={showInfoModal}
          onClick={() => setShowInfoModal(!showInfoModal)}
        />
      </div>
      <div className="flex gap-4">
        <BetsButton onClick={addOnClick}>Add Bet</BetsButton>
        <BetsButton onClick={editOnClick}>{mode}</BetsButton>
      </div>
    </div>
  );
}

