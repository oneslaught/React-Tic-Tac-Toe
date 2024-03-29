import React from "react";

import results from "../styles/game-results.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

export default function GameResults() {
  const { winner } = useGameContext();
  const { onlineWinner, isOnlineMode } = useOnlineContext();

  let containerClass = results.container!;
  let fastFlickerClass = results.fastFlicker!;
  let flickerClass = results.flicker!;

  if (
    (isOnlineMode && winner === "X" && onlineWinner === "YOU") ||
    (isOnlineMode && winner === "O" && onlineWinner === "OPPONENT") ||
    (!isOnlineMode && winner === "X")
  ) {
    containerClass += ` ${results.signX}`;
    fastFlickerClass += ` ${results.fastFlickerX}`;
    flickerClass += ` ${results.flickerX}`;
  } else if (
    (isOnlineMode && winner === "O" && onlineWinner === "YOU") ||
    (isOnlineMode && winner === "X" && onlineWinner === "OPPONENT") ||
    (!isOnlineMode && winner === "O")
  ) {
    containerClass += ` ${results.sign}`;
    fastFlickerClass += ` ${results.fastFlicker}`;
    flickerClass += ` ${results.flicker}`;
  } else if ((isOnlineMode && onlineWinner === "DRAW") || (!isOnlineMode && winner === "draw")) {
    containerClass += ` ${results.signD}`;
    fastFlickerClass += ` ${results.fastFlickerD}`;
    flickerClass += ` ${results.flickerD}`;
  }

  return (
    <div className={`${results.container} ${containerClass} ${winner ? "" : results.hidden}`}>
      {!isOnlineMode && winner && winner !== "draw" && (
        <div className={`${results.font}`}>
          <span className={fastFlickerClass}>{winner} </span>w<span className={flickerClass}>o</span>n
        </div>
      )}
      {!isOnlineMode && winner === "draw" && (
        <div className={`${results.font}`}>
          <span className={fastFlickerClass}>D</span>r<span className={flickerClass}>a</span>w
        </div>
      )}
      {isOnlineMode && onlineWinner && onlineWinner !== "DRAW" && (
        <div className={`${results.font}`}>
          {onlineWinner === "YOU" && (
            <>
              <span className={fastFlickerClass}>Y</span>
              <span className={flickerClass}>o</span>u w<span className={fastFlickerClass}>o</span>
              <span className={flickerClass}>n</span>
            </>
          )}
          {onlineWinner === "OPPONENT" && (
            <>
              <span className={fastFlickerClass}>Y</span>o<span className={flickerClass}>u </span>l
              <span className={fastFlickerClass}>o</span>s<span className={flickerClass}>t</span>
            </>
          )}
        </div>
      )}
      {isOnlineMode && onlineWinner === "DRAW" && (
        <div className={`${results.font}`}>
          <span className={fastFlickerClass}>D</span>r<span className={flickerClass}>a</span>w
        </div>
      )}
    </div>
  );
}
