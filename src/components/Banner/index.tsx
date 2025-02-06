"use client";

import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaDownload } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const occupation = "Software Engineer & Full Stack Developer";

  const [typewriterText] = useTypewriter({
    words: [
      "Technology",
      "Programming",
      "Development",
      "AI",
      "Innovation",
      "Problem Solving",
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 110,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="min-h-[100dvh] w-full relative overflow-x-hidden"
      id="home"
      ref={ref}
    >
      {/* Background hexagons */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-[min(800px,90vw)] h-[min(800px,90vw)] md:w-[800px] md:h-[800px]">
          <motion.div
            className="absolute inset-0 border-[2px] md:border-[3px] border-purple-500/30"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            className="absolute inset-[15%] border-[2px] md:border-[3px] border-pink-500/40"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              rotate: -360,
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              rotate: {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            className="absolute inset-[30%] border-[2px] md:border-[3px] border-purple-500/50"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </div>
      </div>

      {/* Background dots */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px]" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 min-h-[100dvh] w-full bg-black/30 flex items-center justify-center px-4 sm:px-6 md:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Oussama!
            </span>
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 md:mt-4 leading-tight"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>Passionate about</span>
              <div className="w-[250px] sm:w-[280px] md:w-[320px] inline-flex items-center justify-start overflow-hidden">
                <span className="bg-gradient-to-r from-[#8c1df3] via-[#f714d1] to-[#621aaf] text-transparent bg-clip-text bg-[length:500%] animate-gradient">
                  {typewriterText}
                </span>
                <Cursor cursorStyle="|" />
              </div>
            </div>
          </motion.h3>

          <motion.h3
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-thin mt-2 md:mt-4 max-w-[90%] mx-auto leading-relaxed"
          >
            {occupation}
          </motion.h3>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 mt-8 bg-gradient-to-r from-[#8c1df3] to-[#621aaf] rounded-full
              text-white text-sm md:text-base font-semibold transition-all duration-300
              shadow-lg hover:shadow-purple-500/20"
            >
              <FaDownload className="w-4 h-4 md:w-5 md:h-5" />
              Download Resume
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
