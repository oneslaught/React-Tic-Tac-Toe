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

  if ((winner === "X" && onlineWinner === "YOU") || (winner === "O" && onlineWinner === "OPPONENT")) {
    containerClass += ` ${results.signX}`;
    fastFlickerClass += ` ${results.fastFlickerX}`;
    flickerClass += ` ${results.flickerX}`;
  } else if ((winner === "O" && onlineWinner === "YOU") || (winner === "X" && onlineWinner === "OPPONENT")) {
    containerClass += ` ${results.sign}`;
    fastFlickerClass += ` ${results.fastFlicker}`;
    flickerClass += ` ${results.flicker}`;
  } else if (winner === "draw" && onlineWinner === "DRAW") {
    containerClass += ` ${results.signD}`;
    fastFlickerClass += ` ${results.fastFlickerD}`;
    flickerClass += ` ${results.flickerD}`;
  }

  return (
    <div className={`${results.container} ${containerClass} ${winner ? "" : results.hidden}`}>
      {/* {winner && winner !== "draw" && (
        <div className={`${results.font}`}>
          <span className={fastFlickerClass}>{winner} </span>w<span className={flickerClass}>o</span>n
        </div>
      )}
      {winner === "draw" && (
        <div className={`${results.font}`}>
          <span className={fastFlickerClass}>D</span>r<span className={flickerClass}>a</span>w
        </div>
      )} */}
      {isOnlineMode && onlineWinner && onlineWinner !== "DRAW" && (
        <div className={`${results.font}`}>
          {onlineWinner === "YOU" && (
            <>
              <span className={fastFlickerClass}>Y</span>o<span className={flickerClass}>u </span>w
              <span className={fastFlickerClass}>o</span>
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
