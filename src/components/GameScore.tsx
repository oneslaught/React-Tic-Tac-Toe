import React, { useEffect, useState } from "react";

import score from "../styles/game-score.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function GameScore() {
  const [offlineXWins, setOfflineXWins] = useState<number>(0);
  const [offlineOWins, setOfflineOWins] = useState<number>(0);
  const [offlineDraws, setOfflineDraws] = useState<number>(0);

  const { winner } = useGameContext();
  const { isOnlineMode, yourWins, opponentWins, draws: onlineDraws } = useOnlineContext();

  useEffect(() => {
    setOfflineXWins(0);
    setOfflineOWins(0);
    setOfflineDraws(0);
  }, [isOnlineMode]);

  useEffect(() => {
    if (winner === "X") {
      setOfflineXWins(offlineXWins + 1);
    } else if (winner === "O") {
      setOfflineOWins(offlineOWins + 1);
    } else if (winner === "draw") {
      setOfflineDraws(offlineDraws + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const xWins = isOnlineMode ? yourWins : offlineXWins;
  const oWins = isOnlineMode ? opponentWins : offlineOWins;
  const draws = isOnlineMode ? onlineDraws : offlineDraws;

  return (
    <div className={`${score.container}`}>
      <ul>
        <li className={`${score.elem} ${score.x} ${yourWins && score.shake}`}>
          <p>{!isOnlineMode ? "X wins" : "You"}</p>
          <span>{xWins}</span>
        </li>
        <li className={`${score.elem} ${score.draw} ${onlineDraws && score.shake}`}>
          <p>Draws</p>
          <span>{draws}</span>
        </li>
        <li className={`${score.elem} ${score.o} ${opponentWins && score.shake}`}>
          <p>{!isOnlineMode ? "O wins" : "Opponent"}</p>
          <span>{oWins}</span>
        </li>
      </ul>
    </div>
  );
}
