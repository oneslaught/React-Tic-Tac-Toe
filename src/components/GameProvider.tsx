import React, { createContext, useContext, useEffect, useState } from "react";

import calculateWinner from "./CalculateWinner";

type TurnType = "X" | "O";
export type SquareValue = "O" | "X" | undefined;

interface GameContextType {
  turn: TurnType;
  currentSquares: SquareValue[];
  resetGame: VoidFunction;
  winner: SquareValue | "draw";
  gameInProgress: boolean;
  gameNotStarted: boolean;
  handlePlay: (index: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState<TurnType>("X");
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(undefined)]);

  const currentSquares = history[history.length - 1]!;

  const gameNotStarted = currentSquares.every((s) => s === undefined);
  const gameInProgress = !!currentSquares.find((s) => s !== undefined);
  const winner = calculateWinner(currentSquares);

  console.log(history);

  function handlePlay(index: number) {
    if (winner) {
      return;
    }

    const nextSquares: SquareValue[] = currentSquares.slice();
    if (turn === "X") {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    setHistory([...history, nextSquares]);
    setTurn(turn === "X" ? "O" : "X");
  }

  const resetGame = () => {
    function changePlayerTurn() {
      const subArray = history[1];

      for (const element of subArray!) {
        if (element === "X") {
          setTurn("O");
          break;
        } else if (element === "O") {
          setTurn("X");
          break;
        }
      }
    }

    changePlayerTurn();
    setHistory([Array(9).fill(undefined)]);
  };

  const contextValue: GameContextType = {
    currentSquares,
    resetGame,
    winner,
    gameInProgress,
    gameNotStarted,
    turn,
    handlePlay,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
