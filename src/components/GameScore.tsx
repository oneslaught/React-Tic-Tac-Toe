import React, { useEffect } from "react";

import score from "../styles/game-score.module.css";
import { useGameContext } from "./GameContext";

interface GameScoreProps {
  draws: number;
  oWins: number;
  xWins: number;
}

const GameScore: React.FC<GameScoreProps> = ({ draws, oWins, xWins }) => {
  const { removeShake, setRemoveShake, winner } = useGameContext();

  useEffect(() => {
    if (removeShake) {
      const timer = setTimeout(() => {
        setRemoveShake(true);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [removeShake]);

  return (
    <div className={`${score.container}`}>
      <ul>
        <li className={`${score.elem} ${score.x} ${winner === "X" && removeShake && score.shake}`}>
          <p>X wins</p>
          <span>{xWins}</span>
        </li>
        <li className={`${score.elem} ${score.draw} ${winner === "draw" && removeShake && score.shake}`}>
          <p>Draws</p>
          <span>{draws}</span>
        </li>
        <li className={`${score.elem} ${score.o} ${winner === "O" && removeShake && score.shake}`}>
          <p>O wins</p>
          <span>{oWins}</span>
        </li>
      </ul>
    </div>
  );
};

export default GameScore;
