import React, { useEffect } from "react";
import gameNotification from "../styles/game-notification.module.css";
import { useOnlineContext } from "./context/OnlineProvider";

export default function GameNotification() {
  const { gameStarted, setGameStarted } = useOnlineContext();

  useEffect(() => {
    if (gameStarted) {
      setGameStarted(true);
      const timeout = setTimeout(() => {
        setGameStarted(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [gameStarted, setGameStarted]);

  return (
    <div className={`${gameNotification.container}`}>
      <div className={`${gameNotification.notification} ${gameStarted ? gameNotification.show : ""}`}>Game started!</div>
    </div>
  );
}
