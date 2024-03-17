import { motion } from "framer-motion";
import React from "react";

import modeButtonStyle from "../styles/game-mode.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function GameMode() {
  const { gameInProgress } = useGameContext();
  const { connect, disconnect, isOnlineMode } = useOnlineContext();

  return (
    <div className={`${modeButtonStyle.container}`}>
      <motion.button
        className={`${modeButtonStyle.button} ${modeButtonStyle.offline} ${gameInProgress && modeButtonStyle.hidden} ${
          !isOnlineMode && modeButtonStyle.clicked
        }`}
        onClick={disconnect}
      >
        Offline
      </motion.button>
      <motion.button
        className={`${modeButtonStyle.button} ${modeButtonStyle.online} ${gameInProgress && modeButtonStyle.hidden} ${
          isOnlineMode && modeButtonStyle.clicked
        }`}
        onClick={connect}
      >
        Online
      </motion.button>
    </div>
  );
}
