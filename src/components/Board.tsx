import React from "react";

import board from "../styles/board.module.css";
import calculateWinner from "./CalculateWinner";
import { isWinningSquare } from "./CalculateWinner";
import Square, { SquareValue } from "./Square";

interface BoardProps {
  onPlay: (nextSquares: SquareValue[]) => void;
  squares: SquareValue[];
  turn: string;
}

const Board: React.FC<BoardProps> = ({ onPlay, squares, turn }) => {
  function handleClick(i: number) {
    if (calculateWinner(squares) ?? squares[i]) {
      return;
    }
    const nextSquares: SquareValue[] = squares.slice();
    if (turn === "X") {
      nextSquares[i] = "X";
    } else if (turn === "O") {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <div className={`${board.container}`}>
      <div className={`${board.display}`}>
        <Square
          isWinningSquare={isWinningSquare(0, squares)}
          onSquareClick={() => {
            handleClick(0);
          }}
          value={squares[0]}
        />
        <Square
          isWinningSquare={isWinningSquare(1, squares)}
          onSquareClick={() => {
            handleClick(1);
          }}
          value={squares[1]}
        />
        <Square
          isWinningSquare={isWinningSquare(2, squares)}
          onSquareClick={() => {
            handleClick(2);
          }}
          value={squares[2]}
        />
        <Square
          isWinningSquare={isWinningSquare(3, squares)}
          onSquareClick={() => {
            handleClick(3);
          }}
          value={squares[3]}
        />
        <Square
          isWinningSquare={isWinningSquare(4, squares)}
          onSquareClick={() => {
            handleClick(4);
          }}
          value={squares[4]}
        />
        <Square
          isWinningSquare={isWinningSquare(5, squares)}
          onSquareClick={() => {
            handleClick(5);
          }}
          value={squares[5]}
        />
        <Square
          isWinningSquare={isWinningSquare(6, squares)}
          onSquareClick={() => {
            handleClick(6);
          }}
          value={squares[6]}
        />
        <Square
          isWinningSquare={isWinningSquare(7, squares)}
          onSquareClick={() => {
            handleClick(7);
          }}
          value={squares[7]}
        />
        <Square
          isWinningSquare={isWinningSquare(8, squares)}
          onSquareClick={() => {
            handleClick(8);
          }}
          value={squares[8]}
        />
      </div>
    </div>
  );
};

export default Board;
