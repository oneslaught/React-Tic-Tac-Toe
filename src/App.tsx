import React from "react";
import { useState } from "react";

import Board from "./components/Board";
import CalculateWinner from "./components/CalculateWinner";
import GameResults from "./components/GameResults";
import GameScore from "./components/GameScore";
import PlayerTurn from "./components/PlayerTurn";
import ResetButton from "./components/ResetButton";
import "./styles/app.css";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1] ?? Array(9).fill(null);
  const [showResults, setShowResults] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const winAudio = new Audio("./assets/win_sound.ogg");
  const drawAudio = new Audio("./assets/draw_sound.ogg");

  function playWinSound() {
    winAudio.play().catch((error) => {
      console.error("Failed to play win sound:", error);
    });
  }

  function playDrawSound() {
    drawAudio.play().catch((error) => {
      console.error("Failed to play draw sound:", error);
    });
  }

  function handlePlay(nextSquares: (null | string)[]) {
    const winner = CalculateWinner(nextSquares);
    if (winner === "X") {
      setXWins(xWins + 1);
      playWinSound();
    } else if (winner === "O") {
      setOWins(oWins + 1);
      playWinSound();
    } else if (winner === "draw") {
      setDraws(draws + 1);
      playDrawSound();
    }
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
      <GameScore draws={draws} oWins={oWins} xWins={xWins} />
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
