import React, { useEffect, useState } from "react";

import score from "../styles/game-score.module.css";
import { useGameContext } from "./context/GameProvider";

export default function GameScore() {
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const { winner } = useGameContext();

  useEffect(() => {
    if (winner === "X") {
      setXWins(xWins + 1);
    } else if (winner === "O") {
      setOWins(oWins + 1);
    } else if (winner === "draw") {
      setDraws(draws + 1);
    }
  }, [winner]);

  return (
    <div className={`${score.container}`}>
      <ul>
        <li className={`${score.elem} ${score.x} ${winner === "X" && score.shake}`}>
          <p>X wins</p>
          <span>{xWins}</span>
        </li>
        <li className={`${score.elem} ${score.draw} ${winner === "draw" && score.shake}`}>
          <p>Draws</p>
          <span>{draws}</span>
        </li>
        <li className={`${score.elem} ${score.o} ${winner === "O" && score.shake}`}>
          <p>O wins</p>
          <span>{oWins}</span>
        </li>
      </ul>
    </div>
  );
}
