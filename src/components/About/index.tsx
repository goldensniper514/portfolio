"use client";

import Skills from "../Skills";
import { motion } from "framer-motion";

const About = () => {
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

  return (
    <section
      id="about"
      className="container mx-auto px-0 sm:px-6 lg:px-8 py-4 sm:py-16 lg:py-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4 sm:space-y-12"
      >
        {/* Title section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 sm:gap-12 px-2 sm:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            &lt;About Me/&gt;
          </h2>
          <span className="h-[2px] w-full bg-gradient-to-r from-[#2e2e2e] via-purple-500/20 to-[#2e2e2e]" />
        </motion.div>

        {/* Content section */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-8 lg:gap-12">
          {/* Text section */}
          <motion.div
            variants={itemVariants}
            className="flex-1 space-y-3 sm:space-y-6 px-2 sm:px-0"
          >
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              Enterprise Blockchain & Agile Development Leader
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              With over five years of experience in software development, I&apos;ve successfully architected and led the development of enterprise-level applications, managing teams of up to five developers. Over the past two years, I&apos;ve been fully dedicated to decentralized application (DApp) development, collaborating with cross-functional teams to drive innovation in the blockchain space.
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              I&apos;ve deployed more than 10 decentralized applications across multiple blockchain ecosystems, including Ethereum, Binance Smart Chain, Polygon, EOSIO, Solana, CosmWasm, and TON. These applications have collectively attracted over 2,000 daily active users, spanning various industries.
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              Beyond development, I&apos;ve played a key role as an Agile coach, helping organizations adopt Agile methodologies. I&apos;ve successfully coached and mentored teams of up to 50 members across four organizations, fostering a culture of efficiency, collaboration, and continuous improvement. Additionally, I&apos;ve facilitated Agile workshops for over 200 participants, achieving an outstanding average satisfaction rate of 95%.
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              With a strong eye for design, I&apos;m also proficient in figma, creating visually compelling and user-friendly digital interfaces that enhance the user experience.
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              I&apos;m passionate about building scalable, innovative blockchain solutions and empowering teams to achieve their full potential through Agile best practices.
            </p>
          </motion.div>

          {/* Skills section */}
          <motion.div variants={itemVariants} className="flex-1">
            <Skills />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
