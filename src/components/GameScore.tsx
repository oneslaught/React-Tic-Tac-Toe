import React from "react";

import score from "../styles/game-score.module.css";

interface GameScoreProps {
  draws: number;
  oWins: number;
  xWins: number;
}

const GameScore: React.FC<GameScoreProps> = ({ draws, oWins, xWins }) => {
  return (
    <div className={`${score.container}`}>
      <ul>
        <li className={`${score.elem} ${score.x}`}>
          <p>X wins</p>
          <span>{xWins}</span>
        </li>
        <li className={`${score.elem} ${score.draw}`}>
          <p>Draws</p>
          <span>{draws}</span>
        </li>
        <li className={`${score.elem} ${score.o}`}>
          <p>O wins</p>
          <span>{oWins}</span>
        </li>
      </ul>
    </div>
  );
};

export default GameScore;
