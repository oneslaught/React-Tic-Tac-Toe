import React, { PropsWithChildren, createContext, useContext, useState } from "react";

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
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: PropsWithChildren) {
  const [turn, setTurn] = useState<TurnType>("X");
  const [board, setBoard] = useState<SquareValue[]>(Array<SquareValue>(9).fill(undefined));

  const gameInProgress = !!board.find((s) => s !== undefined);
  const winner = calculateWinner(board);

  const handlePlay = (index: number, symbol: PlayerSymbol) => {
    if (winner ?? board[index]) return;
    board[index] = symbol;
    console.log(board);
    setTurn(symbol === "X" ? "O" : "X");
  };

  const resetGame = () => {
    // const firstValue = board.find((value) => value !== undefined);
    // console.log("First value: ", firstValue);
    // setTurn(firstValue === "X" ? "O" : "X");
    setTurn("X");
    setBoard(Array<SquareValue>(9).fill(undefined));
  };

  const contextValue: GameContextType = {
    resetGame,
    winner,
    gameInProgress,
    turn,
    board,
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
