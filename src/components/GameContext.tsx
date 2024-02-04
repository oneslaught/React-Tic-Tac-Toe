import React, { createContext, useContext, useState } from "react";

interface GameContextType {
  currentSquares: (null | string)[];
  draws: number;
  history: (null | string)[][];
  oWins: number;
  removeShake: boolean;
  setDraws: React.Dispatch<React.SetStateAction<number>>;
  setHistory: React.Dispatch<React.SetStateAction<(null | string)[][]>>;
  setOWins: React.Dispatch<React.SetStateAction<number>>;
  setRemoveShake: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setWinner: React.Dispatch<React.SetStateAction<null | string>>;
  setXIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setXWins: React.Dispatch<React.SetStateAction<number>>;
  showResults: boolean;
  winner: null | string;
  xIsNext: boolean;
  xWins: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<(null | string)[][]>([
    Array(9).fill(null),
  ]);
  const currentSquares = history[history.length - 1] ?? Array(9).fill(null);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [winner, setWinner] = useState<null | string>("");
  const [removeShake, setRemoveShake] = useState(true);

  const contextValue: GameContextType = {
    currentSquares,
    draws,
    history,
    oWins,
    removeShake,
    setDraws,
    setHistory,
    setOWins,
    setRemoveShake,
    setShowResults,
    setWinner,
    setXIsNext,
    setXWins,
    showResults,
    winner,
    xIsNext,
    xWins,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
