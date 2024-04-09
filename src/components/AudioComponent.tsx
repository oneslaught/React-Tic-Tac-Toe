import React, { PropsWithChildren, useEffect } from "react";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";

const winXAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/winX_sound.ogg");
const winOAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/winO_sound.ogg");
const drawAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/draw_sound.ogg");
const xAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/x_sound.ogg");
const oAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/o_sound.ogg");
const gameStartedAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/gameStarted_sound.ogg");
const onlineWinAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/onlineWin_sound.ogg");
const onlineLoseAudio = new Audio("https://cdn.jsdelivr.net/gh/oneslaught/React-Tic-Tac-Toe/public/assets/onlineLose_sound.ogg");

function playSound(audio: HTMLAudioElement) {
  audio.play().catch((error: unknown) => {
    console.error("Failed to play sound:", error);
  });
  audio.currentTime = 0;
}

export const AudioComponent = ({ children }: PropsWithChildren) => {
  const { turn, gameInProgress, winner } = useGameContext();
  const { gameStarted, isOnlineMode, onlineWinner } = useOnlineContext();

  useEffect(() => {
    if (gameInProgress) {
      if (turn === "X") {
        playSound(xAudio);
      } else {
        playSound(oAudio);
      }
    }
  }, [turn, gameInProgress]);

  useEffect(() => {
    if (!isOnlineMode) {
      if (winner === "X") {
        playSound(winXAudio);
      } else if (winner === "O") {
        playSound(winOAudio);
      } else if (winner === "draw") {
        playSound(drawAudio);
      }
    } else {
      if (onlineWinner === "YOU") {
        playSound(onlineWinAudio);
      } else if (onlineWinner === "OPPONENT") {
        playSound(onlineLoseAudio);
      } else if (onlineWinner === "DRAW") {
        playSound(drawAudio);
      }
    }
  }, [isOnlineMode, onlineWinner, winner]);

  useEffect(() => {
    if (gameStarted) {
      playSound(gameStartedAudio);
    }
  }, [gameStarted]);

  return <>{children}</>;
};
