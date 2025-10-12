import { GridSquare } from "./GridSquare";

export function Board({ handleClick, gameState, disabled }) {
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
