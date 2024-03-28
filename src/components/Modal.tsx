import React from "react";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import modal from "../styles/modal.module.css";
import { ModalProps } from "../types";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

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
        <React.Fragment>
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#019afe" />
                <stop offset="100%" stopColor="#fe019a" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
        </React.Fragment>
        <CloseIcon onClick={handleClose} className={modal.closeIcon} sx={{ fontSize: 30 }}></CloseIcon>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
