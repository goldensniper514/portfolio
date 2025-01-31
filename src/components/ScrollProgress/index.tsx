"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollProgress = () => {
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Gradient animation based on scroll progress
  const gradient = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["#8c1df3", "#f714d1", "#621aaf", "#8c1df3"]
  );

  // Arrow opacity based on scroll progress
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 z-50 hidden lg:block pl-4">
      <div className="relative h-full flex flex-col items-center">
        {/* Progress line container */}
        <div className="h-full w-[2px]">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            className="stroke-[#2e2e2e] stroke-[2.5]"
          >
            {/* Background line */}
            <line x1="50%" y1="0" x2="50%" y2="100%" className="opacity-30" />
            {/* Animated line */}
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              style={{
                pathLength: scaleX,
                stroke: gradient,
              }}
              className="stroke-[2.5]"
            />
          </svg>
        </div>

        {/* Scroll to top arrow */}
        <motion.button
          style={{ opacity: arrowOpacity }}
          onClick={scrollToTop}
          className="absolute bottom-8 bg-[#2e2e2e50] p-3 rounded-full border border-[#2e2e2e]
            hover:border-[#343434] transition-all duration-200 hover:scale-110 hover:bg-[#2e2e2e80]"
        >
          <FaChevronUp className="w-6 h-6 text-[#8c1df3]" />
        </motion.button>
      </div>
    </div>
  );
};

export default ScrollProgress;
