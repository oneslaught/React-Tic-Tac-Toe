import React from "react";

import turnClass from "../styles/player-turn.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function PlayerTurn() {
  const { turn } = useGameContext();
  const { isOnlineMode, yourTurn } = useOnlineContext();
  const onlineOpponentTurn = isOnlineMode && !yourTurn;

  return (
    <div className={`${turnClass.container} ${isOnlineMode && turnClass.onlineContainer}`}>
      <h3>Turn For</h3>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>{!isOnlineMode ? "X" : "You"}</div>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>{!isOnlineMode ? "O" : "Opponent"}</div>
      {/* <div
        className={`${isOnlineMode ? turnClass.onlineBg : turnClass.bg} ${
          turn === "O" && isOnlineMode ? turnClass.onlineOpponentTurn : turn === "O" ? turnClass.oTurn : ""
        }`}
      ></div> */}
      <div
        className={`${isOnlineMode ? turnClass.onlineBg : turnClass.bg} ${
          onlineOpponentTurn ? turnClass.onlineOpponentTurn : turn === "O" ? turnClass.oTurn : ""
        }`}
      ></div>
    </div>
  );
}
