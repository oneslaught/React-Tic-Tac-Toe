import React from "react";

import { motion } from "framer-motion";
import modalStyle from "../styles/modals.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

export const dropIn = {
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
  handleClose: () => void;
  isWaiting: boolean;
};

const WaitingModal: React.FC<ModalProps> = ({ handleClose, isWaiting }) => {
  return (
    <Modal open={isWaiting}>
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
          <div className={modalStyle.popupTitle}>Waiting for opponent</div>
          <div className={modalStyle.bouncingLoader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <CloseIcon onClick={handleClose} className={modalStyle.closeIcon} sx={{ fontSize: 30 }}></CloseIcon>
        </motion.div>
      </>
    </Modal>
  );
};

export default WaitingModal;
