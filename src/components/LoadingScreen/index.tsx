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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative">
        <motion.svg
          width="200"
          height="200"
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

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute inset-x-0 -bottom-16 text-center"
        >
          <div className="text-lg text-gray-400 font-mono tracking-wider"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
