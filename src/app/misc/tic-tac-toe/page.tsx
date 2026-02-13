"use client";

import { useState, useEffect } from "react";
import { Board } from "../../../components/misc/tic-tac-toe";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(gameState: string[]): string | false {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return gameState[a];
    }
  }
  return false;
}

export default function Game() {
  const [turn, setTurn] = useState<"O" | "X">("O");
  const [gameState, setGameState] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [result, setResult] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const winner = checkWin(gameState);
    if (winner) {
      setResult("Winner: " + winner);
      setDisabled(true);
    }

    if (!winner && gameState.every((symbol) => symbol !== "")) {
      setResult("Draw");
      setDisabled(true);
    }
  }, [gameState]);

  const handleClick = (index: number, currentSymbol: string) => {
    if (currentSymbol === "") {
      setGameState(gameState.map((symbol, i) => (i === index ? turn : symbol)));
      setTurn(turn === "O" ? "X" : "O");
    }
  };

  const reset = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setTurn("O");
    setResult(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-light mb-8">Tic Tac Toe</h1>

      <div className="flex justify-between items-center w-120 m-2">
        {result ? (
          <h2 className="text-lg">
            GAME OVER: <span className="font-bold">{result}</span>
          </h2>
        ) : (
          <h2 className="text-lg bg-yellow-100 px-4 py-2 rounded-md w-28 text-center">
            TURN: <span className="font-bold">{turn}</span>
          </h2>
        )}

        <button
          className="bg-red-200 px-4 py-2 rounded-md cursor-pointer hover:bg-red-300 transition duration-300"
          onClick={reset}
        >
          RESET
        </button>
      </div>

      <Board
        handleClick={handleClick}
        gameState={gameState}
        disabled={disabled}
      />
    </div>
  );
}

