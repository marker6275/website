export function GridSquare({ symbol, onClick, disabled }) {
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
