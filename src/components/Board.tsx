import React from "react";

import board from "../styles/board.module.css";
import { isWinningSquare } from "./CalculateWinner";
import { useOnlineContext } from "./context/OnlineProvider";
import Square from "./Square";
import { useGameContext } from "./context/GameProvider";

export default function Board() {
  const { currentSquares, handlePlay, turn } = useGameContext();
  const { isOnlineMode, send } = useOnlineContext();

  function handleClick(i: number) {
    if (isOnlineMode) {
      send({ type: "TURN", position: i, symbol: turn });
    } else {
      handlePlay(i);
    }
  }

  return (
    <div className={`${board.container}`}>
      <div className={`${board.display}`}>
        <Square
          isWinningSquare={isWinningSquare(0, currentSquares)}
          onSquareClick={() => {
            handleClick(0);
          }}
          value={currentSquares[0]}
        />
        <Square
          isWinningSquare={isWinningSquare(1, currentSquares)}
          onSquareClick={() => {
            handleClick(1);
          }}
          value={currentSquares[1]}
        />
        <Square
          isWinningSquare={isWinningSquare(2, currentSquares)}
          onSquareClick={() => {
            handleClick(2);
          }}
          value={currentSquares[2]}
        />
        <Square
          isWinningSquare={isWinningSquare(3, currentSquares)}
          onSquareClick={() => {
            handleClick(3);
          }}
          value={currentSquares[3]}
        />
        <Square
          isWinningSquare={isWinningSquare(4, currentSquares)}
          onSquareClick={() => {
            handleClick(4);
          }}
          value={currentSquares[4]}
        />
        <Square
          isWinningSquare={isWinningSquare(5, currentSquares)}
          onSquareClick={() => {
            handleClick(5);
          }}
          value={currentSquares[5]}
        />
        <Square
          isWinningSquare={isWinningSquare(6, currentSquares)}
          onSquareClick={() => {
            handleClick(6);
          }}
          value={currentSquares[6]}
        />
        <Square
          isWinningSquare={isWinningSquare(7, currentSquares)}
          onSquareClick={() => {
            handleClick(7);
          }}
          value={currentSquares[7]}
        />
        <Square
          isWinningSquare={isWinningSquare(8, currentSquares)}
          onSquareClick={() => {
            handleClick(8);
          }}
          value={currentSquares[8]}
        />
      </div>
    </div>
  );
}
