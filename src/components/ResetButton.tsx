import { motion } from "framer-motion";
import React, { useEffect } from "react";

import buttonStyle from "../styles/reset-button.module.css";
import { useGameContext } from "./GameContext";

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  const { setShowButton, showButton, winner } = useGameContext();

  useEffect(() => {
    if (showButton) {
      setShowButton(true);
    }
  }, [showButton]);

  const handleResetClick = () => {
    onReset();
  };

  return (
    <div className={`${buttonStyle.container}`}>
      <motion.button
        className={`${buttonStyle.reset} ${buttonStyle.hidden} ${winner && showButton && buttonStyle.visible} `}
        onClick={handleResetClick}
        whileHover={{ scale: 1.1 }}
      >
        Play again
      </motion.button>
    </div>
  );
}
