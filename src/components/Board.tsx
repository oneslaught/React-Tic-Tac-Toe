import React from "react";

import boardStyle from "../styles/board.module.css";
import { useOnlineContext } from "./context/OnlineProvider";
import Square from "./Square";
import { useGameContext } from "./context/GameProvider";
import { SquareValue } from "../types";
import { lines } from "./CalculateWinner";

export default function Board() {
  const { board, handlePlay, turn, winner } = useGameContext();
  const { isOnlineMode, send } = useOnlineContext();

  function handleClick(i: number) {
    if (isOnlineMode) {
      send({ type: "CLIENT_TURN", position: i });
    } else {
      handlePlay(i, turn);
    }
  }

  const isWinningSquare = (index: number, squares: SquareValue[]): boolean => {
    if (winner === "draw" || !winner) {
      return false;
    }

    for (const line of lines) {
      if (line.includes(index) && line.every((i) => squares[i] === winner)) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className={`${boardStyle.container}`}>
      <div className={`${boardStyle.display}`}>
        <Square
          isWinningSquare={isWinningSquare(0, board)}
          onSquareClick={() => {
            handleClick(0);
          }}
          value={board[0]}
        />
        <Square
          isWinningSquare={isWinningSquare(1, board)}
          onSquareClick={() => {
            handleClick(1);
          }}
          value={board[1]}
        />
        <Square
          isWinningSquare={isWinningSquare(2, board)}
          onSquareClick={() => {
            handleClick(2);
          }}
          value={board[2]}
        />
        <Square
          isWinningSquare={isWinningSquare(3, board)}
          onSquareClick={() => {
            handleClick(3);
          }}
          value={board[3]}
        />
        <Square
          isWinningSquare={isWinningSquare(4, board)}
          onSquareClick={() => {
            handleClick(4);
          }}
          value={board[4]}
        />
        <Square
          isWinningSquare={isWinningSquare(5, board)}
          onSquareClick={() => {
            handleClick(5);
          }}
          value={board[5]}
        />
        <Square
          isWinningSquare={isWinningSquare(6, board)}
          onSquareClick={() => {
            handleClick(6);
          }}
          value={board[6]}
        />
        <Square
          isWinningSquare={isWinningSquare(7, board)}
          onSquareClick={() => {
            handleClick(7);
          }}
          value={board[7]}
        />
        <Square
          isWinningSquare={isWinningSquare(8, board)}
          onSquareClick={() => {
            handleClick(8);
          }}
          value={board[8]}
        />
      </div>
    </div>
  );
}
