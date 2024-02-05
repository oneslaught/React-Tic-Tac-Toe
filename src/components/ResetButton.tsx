import React, { useEffect } from "react";

import button from "../styles/reset-button.module.css";
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
    <div className={`${button.container}`}>
      <button
        className={`${button.reset} ${button.hidden} ${
          winner && showButton && button.visible
        } `}
        onClick={handleResetClick}
      >
        Play again
      </button>
    </div>
  );
}
