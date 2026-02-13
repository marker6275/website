import type { ReactNode } from "react";
import type { BetsButtonProps } from "../../types/components/bets";

export function BetsButton({ children, onClick }: BetsButtonProps) {
  return (
    <span
      className="text-md lg:text-xl font-semibold bg-green-200 flex items-center justify-center px-4 py-2 rounded-md cursor-pointer border-1 border-green-400 hover:bg-green-300 hover:shadow-sm w-24 lg:w-32"
      onClick={onClick}
    >
      {children}
    </span>
  );
}

