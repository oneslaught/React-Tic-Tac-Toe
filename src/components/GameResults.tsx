import React from "react";

import results from "../styles/game-results.module.css";
import { useGameContext } from "./GameProvider";

export default function GameResults() {
  const { winner } = useGameContext();

  let containerClass = results.container;
  let fastFlickerClass = results.fastFlicker;
  let flickerClass = results.flicker;

  if (winner === "X") {
    containerClass += ` ${results.signX}`;
    fastFlickerClass += ` ${results.fastFlickerX}`;
    flickerClass += ` ${results.flickerX}`;
  } else if (winner === "O") {
    containerClass += ` ${results.sign}`;
    fastFlickerClass += ` ${results.fastFlicker}`;
    flickerClass += ` ${results.flicker}`;
  } else if (winner === "draw") {
    containerClass += ` ${results.signD}`;
    fastFlickerClass += ` ${results.fastFlickerD}`;
    flickerClass += ` ${results.flickerD}`;
  }

  return (
    <div className={`${results.container} ${containerClass} ${winner ? "" : results.hidden}`}>
      {winner && winner !== "draw" && (
        <div className={`${results.font}`}>
          <span className={`${fastFlickerClass}`}>{winner} </span>w<span className={`${flickerClass}`}>o</span>n
        </div>
      )}
      {winner === "draw" && (
        <div className={`${results.font}`}>
          <span className={`${fastFlickerClass}`}>D</span>r<span className={`${flickerClass}`}>a</span>w
        </div>
      )}
    </div>
  );
}
