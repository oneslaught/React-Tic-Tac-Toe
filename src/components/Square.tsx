import { motion } from "framer-motion";
import React from "react";

import square from "../styles/square.module.css";

export type SquareValue = "O" | "X" | undefined;

interface SquareProps {
  onSquareClick: () => void;
  value: SquareValue;
}

const Square: React.FC<SquareProps> = ({ onSquareClick, value }) => {
  return (
    <motion.button animate={{ scale: 1 }} className={`${square.style}`} disabled={!!value} initial={{ scale: 0.3 }} onClick={onSquareClick}>
      {value && <motion.span animate={{ scale: 1 }} className={square[value]} initial={{ scale: 0 }}></motion.span>}
    </motion.button>
  );
};

export default Square;
