import React, { useEffect, useState } from "react";

import score from "../styles/game-score.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function GameScore() {
  const [offlineXWins, setOfflineXWins] = useState<number>(0);
  const [offlineOWins, setOfflineOWins] = useState<number>(0);
  const [offlineDraws, setOfflineDraws] = useState<number>(0);
  const [animateShake, setAnimateShake] = useState(false);

  const { winner } = useGameContext();
  const {
    isOnlineMode,
    yourWins,
    opponentWins,
    draws: onlineDraws,
    clientSymbol,
    onlineWinner,
    setOpponentWins,
    setYourWins,
    setDraws,
  } = useOnlineContext();

  function removeShake() {
    setAnimateShake(true);
    const timeoutId = setTimeout(() => {
      setAnimateShake(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }

  useEffect(() => {
    setOfflineXWins(0);
    setOfflineOWins(0);
    setOfflineDraws(0);
    setOpponentWins(0);
    setYourWins(0);
    setDraws(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnlineMode]);

  useEffect(() => {
    if (!isOnlineMode && winner === "X") {
      setOfflineXWins(offlineXWins + 1);
      removeShake();
    } else if (!isOnlineMode && winner === "O") {
      setOfflineOWins(offlineOWins + 1);
      removeShake();
    } else if (!isOnlineMode && winner === "draw") {
      setOfflineDraws(offlineDraws + 1);
      removeShake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  useEffect(() => {
    if (isOnlineMode && onlineWinner) {
      removeShake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineWinner]);

  const xWins = isOnlineMode ? yourWins : offlineXWins;
  const oWins = isOnlineMode ? opponentWins : offlineOWins;
  const draws = isOnlineMode ? onlineDraws : offlineDraws;

  const offlineShakeX = !isOnlineMode && winner === "X" && animateShake && score.shake;
  const offlineShakeO = !isOnlineMode && winner === "O" && animateShake && score.shake;
  const offlineShakeDraw = !isOnlineMode && winner === "draw" && animateShake && score.shake;
  const onlineShakePlayer = isOnlineMode && onlineWinner === "YOU" && animateShake && score.shake;
  const onlineShakeOpponent = isOnlineMode && onlineWinner === "OPPONENT" && animateShake && score.shake;
  const onlineShakeDraw = isOnlineMode && onlineWinner === "DRAW" && animateShake && score.shake;

  let onlineScoreX = "";
  let onlineScoreO = "";

  if (isOnlineMode) {
    if (clientSymbol === "X") {
      onlineScoreX = score.x!;
      onlineScoreO = score.o!;
    } else if (clientSymbol === "O") {
      onlineScoreX = score.o!;
      onlineScoreO = score.x!;
    }
  }

  return (
    <div className={`${score.container}`}>
      <ul>
        <li className={`${score.elem} ${!isOnlineMode && score.x} ${onlineScoreX} ${offlineShakeX} ${onlineShakePlayer}`}>
          <p>{!isOnlineMode ? "X wins" : "You"}</p>
          <span>{xWins}</span>
        </li>
        <li className={`${score.elem} ${score.draw} ${offlineShakeDraw} ${onlineShakeDraw}`}>
          <p>Draws</p>
          <span>{draws}</span>
        </li>
        <li className={`${score.elem} ${!isOnlineMode && score.o} ${onlineScoreO} ${offlineShakeO} ${onlineShakeOpponent}`}>
          <p>{!isOnlineMode ? "O wins" : "Opponent"}</p>
          <span>{oWins}</span>
        </li>
      </ul>
    </div>
  );
}
