import React from "react";
import { useState } from "react";

import Board from "./components/Board";
import ResetButton from "./components/ResetButton";
import "./styles/app.css";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1] ?? Array(9).fill(null);

  function handlePlay(nextSquares: (null | string)[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
  }

  return (
    <>
      <Board onPlay={handlePlay} squares={currentSquares} xIsNext={xIsNext} />
      <ResetButton onReset={handleReset} />
    </>
  );
}
