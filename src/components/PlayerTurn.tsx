import React from "react";

import turnClass from "../styles/player-turn.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function PlayerTurn() {
  const { turn } = useGameContext();
  const { isOnlineMode, yourTurn, clientSymbol } = useOnlineContext();
  const isOnlineOpponentTurn = isOnlineMode && !yourTurn;

  let turnClassBg = "";
  let onlineOpponentTurn = "";

  if (isOnlineMode) {
    if (clientSymbol === "X") {
      turnClassBg = turnClass.onlineBgX!;
    } else {
      turnClassBg = turnClass.onlineBgO!;
    }
  } else {
    turnClassBg = turnClass.bgX!;
  }

  if (isOnlineOpponentTurn) {
    if (clientSymbol === "X") {
      onlineOpponentTurn = turnClass.onlineOpponentTurnO!;
    } else {
      onlineOpponentTurn = turnClass.onlineOpponentTurnX!;
    }
  }

  return (
    <div className={`${turnClass.container} ${isOnlineMode && turnClass.onlineContainer}`}>
      <h3>Turn For</h3>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>{!isOnlineMode ? "X" : "You"}</div>
      <div className={`${turnClass.turnBox} ${turnClass.align}`}>{!isOnlineMode ? "O" : "Opponent"}</div>
      <div className={`${turnClassBg} ${onlineOpponentTurn} ${!isOnlineMode && turn === "O" ? turnClass.oTurn : ""}`}></div>
    </div>
  );
}
