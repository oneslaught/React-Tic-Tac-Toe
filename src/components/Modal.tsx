import React from "react";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import modal from "../styles/modal.module.css";
import { ModalProps } from "../types";
import CloseIcon from "@mui/icons-material/Close";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
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

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        drag
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
        dragElastic={0.6}
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
    </Backdrop>
  );
};

export default Modal;
