import React from "react";

import { motion } from "framer-motion";
import modalStyle from "../styles/modals.module.css";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { dropIn } from "./WaitingModal";

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
          className={`${modalStyle.popupWindow}`}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={modalStyle.popupTitle}>Your opponent has disconnected!</div>
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
