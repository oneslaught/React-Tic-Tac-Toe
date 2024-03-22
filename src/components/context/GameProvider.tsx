import React, { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

import calculateWinner from "../CalculateWinner";
import { SquareValue } from "../../types";

type TurnType = "X" | "O";

interface GameContextType {
  turn: TurnType;
  currentSquares: SquareValue[];
  resetGame: VoidFunction;
  winner: SquareValue | "draw";
  gameInProgress: boolean;
  handlePlay: (index: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: PropsWithChildren) {
  const [turn, setTurn] = useState<TurnType>("X");
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(undefined)]);

  const currentSquares = useMemo(() => history[history.length - 1]!, [history]);
  const gameInProgress = useMemo(() => !!currentSquares.find((s) => s !== undefined), [currentSquares]);
  const winner = useMemo(() => calculateWinner(currentSquares), [currentSquares]);

  const handlePlay = useCallback(
    (index: number) => {
      if (winner) return;
      const nextSquares = currentSquares.slice();
      nextSquares[index] = turn === "X" ? "X" : "O";

      setHistory([...history, nextSquares]);
      setTurn(turn === "X" ? "O" : "X");
    },
    [winner, currentSquares, turn],
  );

  const resetGame = useCallback(() => {
    setTurn(history[1]?.find((v) => !!v) === "X" ? "O" : "X");
    setHistory([Array(9).fill(undefined)]);
  }, [history, setTurn, setHistory]);

  const contextValue: GameContextType = useMemo(
    () => ({
      currentSquares,
      resetGame,
      winner,
      gameInProgress,
      turn,
      handlePlay,
    }),
    [currentSquares, resetGame, winner, gameInProgress, turn, handlePlay],
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
