"use client";

import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "2021 - Present",
    cardTitle: "Software Engineering",
    cardSubtitle: "1337 School (42 Network) - Programming School",
    cardDetailedText:
      "An intensive project-based curriculum focused on software engineering, algorithms, and system programming. Part of the prestigious 42 Network known for its peer-to-peer learning methodology.",
  },
  {
    title: "2018 - 2021",
    cardTitle: "Economics and Management",
    cardSubtitle: "Faculty of Economics and Management - University Hassan I",
    cardDetailedText:
      "Studied economics and management with focus on data analysis and business systems, developing analytical skills that complement software engineering.",
  },
  {
    title: "2018",
    cardTitle: "High School Diploma",
    cardSubtitle: "Economics and Management",
    cardDetailedText:
      "Completed secondary education with focus on scientific subjects including mathematics, economics, and management.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Education = () => {
  return (
    <div id="education" className="relative w-full py-4 sm:py-16 lg:py-20">
      {/* Vue-inspired animated background */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          {/* Large rotating hexagon */}
          <motion.div
            className="absolute inset-0 border-[3px] border-purple-500/30"
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
          {/* Medium rotating hexagon */}
          <motion.div
            className="absolute inset-[15%] border-[3px] border-pink-500/40"
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
          {/* Small rotating hexagon */}
          <motion.div
            className="absolute inset-[30%] border-[3px] border-purple-500/50"
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

      {/* Dot pattern background */}
      <div className="absolute inset-0 z-[1]">
        <div className="h-full w-full bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px]" />
      </div>

      {/* Content container with dark overlay */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-[2]"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 sm:gap-12 px-2 sm:px-0 mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              &lt;Education/&gt;
            </h2>
            <span className="h-[2px] w-full bg-gradient-to-r from-[#2e2e2e] via-purple-500/20 to-[#2e2e2e]" />
          </motion.div>
          <div className="w-full max-w-[1200px] mx-auto">
            <Timeline
              data={educationData.map((item) => ({
                title: item.title,
                content: (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.cardTitle}
                    </h3>
                    <p className="text-gray-300 font-medium mb-2">
                      {item.cardSubtitle}
                    </p>
                    <p className="text-gray-400">{item.cardDetailedText}</p>
                  </div>
                ),
              }))}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
