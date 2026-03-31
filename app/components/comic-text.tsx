"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface ComicTextProps {
  children: React.ReactNode;
  fontSize?: number; // in rem units
  backgroundColor?: string;
  dotColor?: string;
  className?: string;
}

export const ComicText = ({
  children,
  fontSize = 5,
  backgroundColor = "white",
  dotColor = "#93C5FD",
  className = "",
}: ComicTextProps) => {
  const strokeWidth = fontSize * 0.35;
  const dotSize = Math.max(1.5, fontSize * 0.3);
  const dotSpacing = dotSize * 4;

  const textStyle: CSSProperties = {
    fontSize: `${fontSize}rem`,
    fontWeight: 900,
    WebkitTextStroke: `${strokeWidth}px #000000`,
    transform: "skewX(-10deg)",
    filter: "drop-shadow(5px 5px 0px #000000) drop-shadow(3px 3px 0px #2563EB)",
    backgroundImage: `radial-gradient(circle at ${dotSize}px ${dotSize}px, ${dotColor} ${dotSize}px, transparent 0)`,
    backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 1, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      whileHover={{ scale: 1.5, rotate: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 1.2,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring",
      }}
    >
      <span style={textStyle}>{children}</span>
    </motion.div>
  );
};
