import React from "react";
import { useState } from "react";

import Board from "./components/Board";
import GameResults from "./components/GameResults";
import PlayerTurn from "./components/PlayerTurn";
import ResetButton from "./components/ResetButton";
import "./styles/app.css";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1] ?? Array(9).fill(null);
  const [showResults, setShowResults] = useState(true);

  function handlePlay(nextSquares: (null | string)[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
    setShowResults(false);
  }

  return (
    <>
      <PlayerTurn />
      <Board onPlay={handlePlay} squares={currentSquares} xIsNext={xIsNext} />
      <GameResults
        setShowResults={setShowResults}
        showResults={showResults}
        squares={currentSquares}
      />
      <ResetButton onReset={handleReset} />
    </>
  );
}
