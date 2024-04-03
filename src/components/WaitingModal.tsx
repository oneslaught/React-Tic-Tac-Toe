import React from "react";

import { motion } from "framer-motion";
import modal from "../styles/waiting-modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

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
  handleClose: () => void;
  modalOpen: boolean;
};

const WaitingModal: React.FC<ModalProps> = ({ handleClose, modalOpen }) => {
  return (
    <Modal open={modalOpen}>
      <>
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${modal.modalWindow}`}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={modal.titlePopup}>Waiting for opponent</div>
          <div className={modal.bouncingLoader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <CloseIcon onClick={handleClose} className={modal.closeIcon} sx={{ fontSize: 30 }}></CloseIcon>
        </motion.div>
      </>
    </Modal>
  );
};

export default WaitingModal;
