import React from "react";

import square from "../styles/square.module.css";

interface SquareProps {
  onSquareClick: () => void;
  value: null | string | undefined;
}

const Square: React.FC<SquareProps> = ({ onSquareClick, value }) => {
  const playerClass = value === "X" ? square.x : value === "O" ? square.o : "";

  return (
    <button
      className={`${square.scale} ${playerClass}`}
      disabled={value !== null}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
