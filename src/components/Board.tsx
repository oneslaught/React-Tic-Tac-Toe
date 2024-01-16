import React from "react";

import calculateWinner from "./CalculateWinner";
import Square from "./Square";
interface BoardProps {
  onPlay: (nextSquares: (null | string)[]) => void;
  squares: (null | string)[];
  xIsNext: boolean;
}

const Board: React.FC<BoardProps> = ({ onPlay, squares, xIsNext }) => {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares: (null | string)[] = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  );
};

export default Board;
