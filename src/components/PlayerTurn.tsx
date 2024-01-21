import React from "react";

import turn from "../styles/player-turn.module.css";

export default function PlayerTurn() {
  return (
    <div className={`${turn.container}`}>
      <h3>Turn For</h3>
      <div className={`${turn.turnBox} ${turn.align}`}>X</div>
      <div className={`${turn.turnBox} ${turn.align}`}>O</div>
      <div className={`${turn.bg}`}></div>
    </div>
  );
}
