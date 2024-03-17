import { motion } from "framer-motion";
import React from "react";

import buttonStyle from "../styles/reset-button.module.css";
import { useGameContext } from "./context/GameProvider";

export default function ResetButton() {
  const { winner, resetGame } = useGameContext();

  return (
    <div className={`${buttonStyle.container}`}>
      <motion.button
        className={`${buttonStyle.reset} ${buttonStyle.hidden} ${winner && buttonStyle.visible} `}
        onClick={resetGame}
        whileHover={{ scale: 1.1 }}
      >
        Play again
      </motion.button>
    </div>
  );
}
