import { motion } from "framer-motion";
import React from "react";

import buttonStyle from "../styles/reset-button.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function ResetButton() {
  const { winner, resetGame } = useGameContext();
  const { send, isOnlineMode } = useOnlineContext();

  function handleReset() {
    if (isOnlineMode) {
      send({ type: "RESET" });
    } else {
      resetGame();
    }
  }

  return (
    <div className={`${buttonStyle.container}`}>
      <motion.button
        className={`${buttonStyle.reset} ${buttonStyle.hidden} ${winner && buttonStyle.visible} `}
        onClick={handleReset}
        whileHover={{ scale: 1.1 }}
      >
        Play again
      </motion.button>
    </div>
  );
}
