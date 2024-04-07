import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import modeButtonStyle from "../styles/game-mode.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";
import CustomModal from "./WaitingModal";
import DisconnectModal from "./DisconnectModal";

export default function GameMode() {
  const { gameInProgress, resetGame } = useGameContext();
  const { connect, disconnect, reconnect, isOnlineMode, modalOpen, setModalOpen, isDisconnect, setIsDisconnect } = useOnlineContext();

  const handleOnlineClick = () => {
    setModalOpen(false);
    connect();
  };

  return (
    <div className={`${modeButtonStyle.container}`}>
      <motion.button
        className={`${modeButtonStyle.button} ${modeButtonStyle.offline} ${gameInProgress && modeButtonStyle.hidden} ${
          !isOnlineMode && modeButtonStyle.clicked
        }`}
        onClick={disconnect}
      >
        Offline
      </motion.button>
      <motion.button
        className={`${modeButtonStyle.button} ${modeButtonStyle.online} ${gameInProgress && modeButtonStyle.hidden} ${
          isOnlineMode && modeButtonStyle.clicked
        }`}
        onClick={handleOnlineClick}
      >
        Online
      </motion.button>
      {modalOpen && (
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          <CustomModal
            modalOpen={modalOpen}
            handleClose={() => {
              setModalOpen(false);
              disconnect();
            }}
          />
        </AnimatePresence>
      )}
      {isDisconnect && (
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          <DisconnectModal
            isDisconnect={isDisconnect}
            handleExit={() => {
              setIsDisconnect(false);
              disconnect();
              resetGame();
            }}
            handleRestart={() => {
              setIsDisconnect(false);
              reconnect();
              resetGame();
            }}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
