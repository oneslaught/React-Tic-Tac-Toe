import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import modeButtonStyle from "../styles/game-mode.module.css";
import { useGameContext } from "./context/GameProvider";
import { useOnlineContext } from "./context/OnlineProvider";
import Modal from "./Modal";

export default function GameMode() {
  const { gameInProgress } = useGameContext();
  const { connect, disconnect, isOnlineMode } = useOnlineContext();

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => {
    setModalOpen(false);
  };
  const open = () => {
    setModalOpen(true);
  };

  const handleClick = () => {
    connect();
    if (modalOpen) {
      close();
    } else {
      open();
    }
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
        onClick={handleClick}
      >
        Online
      </motion.button>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}
