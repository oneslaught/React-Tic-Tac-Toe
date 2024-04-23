import React, { PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from "react";

import calculateWinner from "../CalculateWinner";
import { PlayerSymbol, SquareValue } from "../../types";

type TurnType = "X" | "O";

type GameContextType = {
  turn: TurnType;
  board: SquareValue[];
  resetGame: VoidFunction;
  winner: SquareValue | "draw";
  gameInProgress: boolean;
  handlePlay: (index: number, symbol: PlayerSymbol) => void;
  setTurn: (newTurn: TurnType) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: PropsWithChildren) {
  const [turn, setTurn] = useState<TurnType>("X");
  const [board, setBoard] = useState<SquareValue[]>(Array<SquareValue>(9).fill(undefined));

  const gameInProgress = !!board.find((s) => s !== undefined);
  const winner = calculateWinner(board);
  const firstSymbol = useRef<PlayerSymbol | null>(null);

  const handlePlay = (index: number, symbol: PlayerSymbol) => {
    if (winner ?? board[index]) return;
    board[index] = symbol;
    setTurn(symbol === "X" ? "O" : "X");

    if (firstSymbol.current === null) {
      firstSymbol.current = symbol;
    }
  };

  const resetGame = useCallback(() => {
    if (firstSymbol.current !== null) {
      firstSymbol.current = firstSymbol.current === "X" ? "O" : "X";
      setTurn(firstSymbol.current);
    }
    setBoard(Array<SquareValue>(9).fill(undefined));
  }, []);

  const contextValue: GameContextType = {
    setTurn,
    board,
    resetGame,
    winner,
    gameInProgress,
    turn,
    handlePlay,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
