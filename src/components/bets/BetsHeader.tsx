"use client";

import { BetsInfoModal, BetsButton } from ".";
import { useState } from "react";
import type { BetsHeaderProps } from "@/types/components";

export function BetsHeader({
  titleOnClick,
  addOnClick,
  editOnClick,
  mode,
}: BetsHeaderProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="flex w-full shrink-0 flex-col items-center gap-5 px-10 pt-10 lg:flex-row lg:justify-between">
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
