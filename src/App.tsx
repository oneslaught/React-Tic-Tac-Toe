import React from "react";
import { useState } from "react";

import Board from "./components/Board";
import "./styles/app.css";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1] ?? Array(9).fill(null);

  function handlePlay(nextSquares: (null | string)[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} squares={currentSquares} xIsNext={xIsNext} />
      </div>
    </div>
  );
}
