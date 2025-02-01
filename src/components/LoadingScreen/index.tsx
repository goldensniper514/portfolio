"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.3 }}
      className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black"
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuetext="Please wait while the portfolio loads"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            initial="hidden"
            animate="visible"
            className="transform rotate-90"
          >
            {/* Outer circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              stroke="#9333ea"
              strokeWidth="4"
              fill="none"
              variants={draw}
            />

            {/* Inner circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="60"
              stroke="#ec4899"
              strokeWidth="4"
              fill="none"
              variants={draw}
              transition={{
                pathLength: { duration: 2, bounce: 0 },
                opacity: { duration: 0.01 },
              }}
            />

            {/* Code bracket lines */}
            <motion.path
              d="M70 60 L50 100 L70 140"
              stroke="#9333ea"
              strokeWidth="4"
              fill="none"
              variants={draw}
              strokeLinecap="round"
            />
            <motion.path
              d="M130 60 L150 100 L130 140"
              stroke="#ec4899"
              strokeWidth="4"
              fill="none"
              variants={draw}
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}
