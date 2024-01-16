import React from "react";

interface SquareProps {
  onSquareClick: () => void;
  value: null | string | undefined;
}

const Square: React.FC<SquareProps> = ({ onSquareClick, value }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
