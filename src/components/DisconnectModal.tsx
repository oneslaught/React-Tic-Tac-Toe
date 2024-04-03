import React from "react";

import { motion } from "framer-motion";
import disconnectStyle from "../styles/disconnect-modal.module.css";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 1,
  },
  visible: {
    y: "0",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

type ModalProps = {
  handleExit: () => void;
  handleRestart: () => void;
  isDisconnect: boolean;
};

const CustomModal: React.FC<ModalProps> = ({ handleExit, handleRestart, isDisconnect }) => {
  return (
    <Modal open={isDisconnect}>
      <>
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${disconnectStyle.disconnectWindow}`}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={disconnectStyle.titleDisconnect}>Your opponent has disconnected!</div>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleExit} variant="contained" color="error" sx={{ minWidth: "113px" }}>
              Exit
            </Button>
            <Button onClick={handleRestart} variant="contained" color="success" sx={{ minWidth: "113px" }}>
              New Game
            </Button>
          </Stack>
        </motion.div>
      </>
    </Modal>
  );
};

export default CustomModal;
