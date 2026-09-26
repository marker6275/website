import { betSortOptions } from "./BetUtils";
import type { BetSortMode, BetSortSelectProps } from "@/types/components";

export function BetSortSelect({
  sortMode,
  setSortMode,
  reversed,
  setReversed,
}: BetSortSelectProps) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-semibold text-gray-700"
    >
      <label className="flex items-center gap-1 cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-3 py-1 transition-colors hover:bg-white">
        Sort:
        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as BetSortMode)}
          className="cursor-pointer bg-transparent font-semibold outline-none"
        >
          {betSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => setReversed(!reversed)}
        aria-label={reversed ? "Sort descending" : "Sort ascending"}
        title="Reverse order"
        className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-2 py-1 transition-colors hover:bg-white"
      >
        {reversed ? "↑" : "↓"}
      </button>
    </div>
  );
}
