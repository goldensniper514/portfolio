"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 top-6 z-[9999]">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="glass-primary rounded-full p-3 flex items-center justify-center hover:glass-secondary transition-all duration-200 shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <IoColorPaletteOutline className="w-6 h-6 gradient-text" />
        </motion.button>

        <motion.div
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          className="absolute right-0 top-14 glass-secondary rounded-xl p-2 min-w-[180px] shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {Object.entries(themes).map(([key, themeOption]) => (
            <motion.button
              key={key}
              variants={{
                open: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
                closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
              }}
              onClick={() => {
                setTheme(key);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors duration-200 ${
                theme.name === themeOption.name
                  ? "glass-primary gradient-text font-medium"
                  : "hover:glass-primary text-[var(--text-primary)]"
              }`}
            >
              {themeOption.name}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
