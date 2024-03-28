import React from "react";

import { motion } from "framer-motion";
import classBd from "../styles/board.module.css";
import { BackdropProps } from "../types";

export default function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div className={classBd.backdrop} onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
}
