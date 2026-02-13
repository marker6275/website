import { GridSquare } from "./GridSquare";
import type { BoardProps } from "../../../types/components/misc";

export function Board({ handleClick, gameState, disabled }: BoardProps) {
  return (
    <div className="bg-orange-100 grid grid-cols-3 grid-rows-3 size-120">
      {gameState.map((symbol, index) => (
        <GridSquare
          symbol={symbol}
          onClick={() => (!disabled ? handleClick(index, symbol) : undefined)}
          key={index}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

