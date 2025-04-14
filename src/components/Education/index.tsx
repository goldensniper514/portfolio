"use client";

import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "01/2024  - Present",
    cardTitle: " Senior Frontend Developer",
    cardSubtitle: "Adrestus LTD",
    cardDetailedText:
      "Led the Adrestus website development with 3D effects using Three.js, a dynamic front end with React, and a modern UI with Tailwind CSS. Converted Java security functions to JavaScript for better client-side security.",
  },
  {
    title: "10/2023 - 12/2023",
    cardTitle: "Senior Full Stack Engineer",
    cardSubtitle: "MC² Finance",
    cardDetailedText:
      "Built a Vue.js web app with reusable components, a Rust backend, and a PostgreSQL database. Added blockchain transaction tracking, real-time updates, and Cypress testing for reliability.",
  },
  {
    title: " 06/2021 - 09/2023 ",
    cardTitle: " Senior Software Engineer",
    cardSubtitle: "Soteria Smart Contracts Inc",
    cardDetailedText:
      "Built and deployed Ethereum smart contracts, integrated DApps, and designed responsive UIs with React. Ensured secure transactions with MetaMask and optimized performance with Redux. Collaborated with teams to deliver user-focused features.",
  },
  {
    title: "06/2018 - 05/2021 ",
    cardTitle: " Senior Software Engineer",
    cardSubtitle: "NewKnow",
    cardDetailedText:
      "Developed blockchain solutions for supply chain and DeFi, reducing tracking errors by 50% and supporting over 3,000 users. Built secure smart contracts and decentralized apps on Ethereum and BSC for enterprise clients.",
  },
  {
    title: "11/2014 - 05/2018 ",
    cardTitle: "Queen's University",
    cardSubtitle: "BachelorofScience - BS",
    cardDetailedText:
      "",
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
              &lt;Personal history/&gt;
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
