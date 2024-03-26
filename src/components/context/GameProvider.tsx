import React, { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

import calculateWinner from "../CalculateWinner";
import { PlayerSymbol, SquareValue } from "../../types";

type TurnType = "X" | "O";

type GameContextType = {
  turn: TurnType;
  currentSquares: SquareValue[];
  resetGame: VoidFunction;
  winner: SquareValue | "draw";
  gameInProgress: boolean;
  handlePlay: (index: number, symbol: PlayerSymbol) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: PropsWithChildren) {
  const [turn, setTurn] = useState<TurnType>("X");
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(undefined)]);

  const currentSquares = useMemo(() => history[history.length - 1]!, [history]);
  const gameInProgress = useMemo(() => !!currentSquares.find((s) => s !== undefined), [currentSquares]);
  const winner = useMemo(() => calculateWinner(currentSquares), [currentSquares]);

  const handlePlay = useCallback(
    (index: number, symbol: PlayerSymbol) => {
      if (winner) return;
      const nextSquares = currentSquares.slice();
      nextSquares[index] = symbol;

      setHistory([...history, nextSquares]);
      setTurn(symbol === "X" ? "O" : "X");
    },
    [winner, currentSquares, history],
  );

  const resetGame = useCallback(() => {
    setTurn(history[1]?.find((v) => !!v) === "X" ? "O" : "X");
    setHistory([Array(9).fill(undefined)]);
  }, [setHistory, setTurn, history]);

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
