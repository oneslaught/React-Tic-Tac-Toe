import React, { useEffect } from "react";

import results from "../styles/game-results.module.css";
import CalculateWinner from "./CalculateWinner";
import { useGameContext } from "./GameContext";
import { SquareValue } from "./Square";

interface GameResultsProps {
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  showResults: boolean;
  squares: SquareValue[];
}

const GameResults: React.FC<GameResultsProps> = ({ setShowResults, showResults, squares }) => {
  const { setWinner, winner } = useGameContext();
  useEffect(() => {
    const result = CalculateWinner(squares);
    if (result) {
      setShowResults(true);
      setWinner(result);
    }
  }, [squares]);

  let containerClass = results.container;
  let fastFlickerClass = results.fastFlicker;
  let flickerClass = results.flicker;

  if (winner === "X") {
    containerClass += ` ${results.signX}`;
    fastFlickerClass += ` ${results.fastFlickerX}`;
    flickerClass += ` ${results.flickerX}`;
  } else if (winner === "O") {
    containerClass += ` ${results.sign}`;
    fastFlickerClass += ` ${results.fastFlicker}`;
    flickerClass += ` ${results.flicker}`;
  } else if (winner === "draw") {
    containerClass += ` ${results.signD}`;
    fastFlickerClass += ` ${results.fastFlickerD}`;
    flickerClass += ` ${results.flickerD}`;
  }

  return (
    <div className={`${results.container} ${containerClass} ${showResults ? "" : results.hidden}`}>
      {winner && winner !== "draw" && (
        <div className={`${results.font}`}>
          <span className={`${fastFlickerClass}`}>{winner} </span>w<span className={`${flickerClass}`}>o</span>n
        </div>
      )}
      {winner === "draw" && (
        <div className={`${results.font}`}>
          <span className={`${fastFlickerClass}`}>D</span>r<span className={`${flickerClass}`}>a</span>w
        </div>
      )}
    </div>
  );
};

export default GameResults;
