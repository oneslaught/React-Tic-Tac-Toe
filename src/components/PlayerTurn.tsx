import React from "react";

import turn from "../styles/player-turn.module.css";
import { useGameContext } from "./GameContext";

export default function PlayerTurn() {
  const { xIsNext } = useGameContext();

  return (
    <div className={`${turn.container}`}>
      <h3>Turn For</h3>
      <div className={`${turn.turnBox} ${turn.align}`}>X</div>
      <div className={`${turn.turnBox} ${turn.align}`}>O</div>
      <div className={`${turn.bg} ${!xIsNext && turn.oTurn}`}></div>
    </div>
  );
}
