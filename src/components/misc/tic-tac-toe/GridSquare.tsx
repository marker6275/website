import type { GridSquareProps } from "../../../types/components/misc";

export function GridSquare({ symbol, onClick, disabled }: GridSquareProps) {
  return (
    <div
      className={`border-1 border-black flex items-center justify-center text-6xl transition duration-300 cursor-pointer ${
        symbol === "" ? "hover:bg-orange-200" : ""
      }`}
      onClick={onClick}
    >
      {symbol}
    </div>
  );
}

