import React from "react";

import button from "../styles/reset-button.module.css";

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  const handleResetClick = () => {
    onReset();
  };

  return (
    <div className={`${button.container}`}>
      <button className={`${button.reset} `} onClick={handleResetClick}>
        Play again
      </button>
    </div>
  );
}
