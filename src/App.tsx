import React from "react";

import Board from "./components/Board";
import CalculateWinner from "./components/CalculateWinner";
import { useGameContext } from "./components/GameContext";
import GameResults from "./components/GameResults";
import GameScore from "./components/GameScore";
import PlayerTurn from "./components/PlayerTurn";
import ResetButton from "./components/ResetButton";
import { SquareValue } from "./components/Square";
import "./styles/app.css";

const winXAudio = new Audio("../public/assets/winX_sound.ogg");
const winOAudio = new Audio("../public/assets/winO_sound.ogg");
const drawAudio = new Audio("../public/assets/draw_sound.ogg");
const xAudio = new Audio("../public/assets/x_sound.ogg");
const oAudio = new Audio("../public/assets/o_sound.ogg");

export default function App() {
  const {
    currentSquares,
    draws,
    history,
    oWins,
    setDraws,
    setHistory,
    setOWins,
    setRemoveShake,
    setShowButton,
    setShowResults,
    setTurn,
    setXWins,
    showResults,
    turn,
    xWins,
  } = useGameContext();

  function playWinXSound() {
    winXAudio.play().catch((error) => {
      console.error("Failed to play win sound:", error);
    });
    winXAudio.currentTime = 0;
  }

  function playWinOSound() {
    winOAudio.play().catch((error) => {
      console.error("Failed to play win sound:", error);
    });
    winOAudio.currentTime = 0;
  }

  function playDrawSound() {
    drawAudio.play().catch((error) => {
      console.error("Failed to play draw sound:", error);
    });
    drawAudio.currentTime = 0;
  }

  function playXSound() {
    xAudio.play().catch((error) => {
      console.error("Failed to play win sound:", error);
    });
    xAudio.currentTime = 0;
  }

  function playOSound() {
    oAudio.play().catch((error) => {
      console.error("Failed to play draw sound:", error);
    });
    oAudio.currentTime = 0;
  }

  function handlePlay(nextSquares: SquareValue[]) {
    const winner = CalculateWinner(nextSquares);

    if (turn === "X") {
      playXSound();
    } else if (turn === "O") {
      playOSound();
    }
    if (winner === "X") {
      setXWins(xWins + 1);
      setRemoveShake(true);
      setShowButton(true);
      playWinXSound();
    } else if (winner === "O") {
      setOWins(oWins + 1);
      setRemoveShake(true);
      setShowButton(true);
      playWinOSound();
    } else if (winner === "draw") {
      setDraws(draws + 1);
      setRemoveShake(true);
      setShowButton(true);
      playDrawSound();
    }
    setHistory([...history, nextSquares]);
    setTurn(turn === "X" ? "O" : "X");
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setTurn("X");
    setShowResults(false);
    setTimeout(() => {
      setRemoveShake(false);
    }, 700);
    setShowButton(false);
  }

  return (
    <>
      <PlayerTurn />
      <GameScore draws={draws} oWins={oWins} xWins={xWins} />
      <Board onPlay={handlePlay} squares={currentSquares} turn={turn} />
      <GameResults setShowResults={setShowResults} showResults={showResults} squares={currentSquares} />
      <ResetButton onReset={handleReset} />
    </>
  );
}
