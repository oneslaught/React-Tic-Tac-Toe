import React, { PropsWithChildren, useEffect } from "react";
import { useGameContext } from "./context/GameProvider";

const winXAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/winX_sound.ogg");
const winOAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/winO_sound.ogg");
const drawAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/draw_sound.ogg");
const xAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/x_sound.ogg");
const oAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/o_sound.ogg");

function playSound(audio: HTMLAudioElement) {
  audio.play().catch((error) => {
    console.error("Failed to play sound:", error);
  });
  audio.currentTime = 0;
}

export const AudioComponent = ({ children }: PropsWithChildren) => {
  const { turn, gameInProgress, winner } = useGameContext();

  useEffect(() => {
    if (gameInProgress) {
      if (turn === "X") {
        playSound(xAudio);
      } else {
        playSound(oAudio);
      }
    }
  }, [turn]);

  useEffect(() => {
    if (winner === "X") {
      playSound(winXAudio);
    } else if (winner === "O") {
      playSound(winOAudio);
    } else if (winner === "draw") {
      playSound(drawAudio);
    }
  }, [winner]);

  return <>{children}</>;
};
