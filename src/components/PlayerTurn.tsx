import React from "react";

import turnClass from "../styles/player-turn.module.css";
import { useGameContext } from "./GameContext";

export default function PlayerTurn() {
  const { turn } = useGameContext();

  return (
    <div className={`${turnClass.container}`}>
      <h3>Turn For</h3>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>X</div>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>O</div>
      <div
        className={`${turnClass.bg} ${turn === "O" && turnClass.oTurn}`}
      ></div>
    </div>
  );
}
