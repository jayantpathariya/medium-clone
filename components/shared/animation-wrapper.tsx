"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type AnimationWrapperProps = {
  children: React.ReactNode;
  initial?: {
    opacity: number;
  };
  animate?: {
    opacity: number;
  };
  transition?: {
    duration: number;
    delay?: number;
  };
  keyValue?: string;
  className?: string;
};

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1, delay: 0 },
  keyValue,
  className,
}: AnimationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyValue}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
