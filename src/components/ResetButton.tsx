import React from "react";

import button from "../styles/reset-button.module.css";

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <div className={`${button.container}`}>
      <button className={`${button.reset}`} onClick={onReset}>
        Play again
      </button>
    </div>
  );
}
