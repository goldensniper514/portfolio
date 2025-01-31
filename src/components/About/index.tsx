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
              Fullstack developer with 4 years of coding experience through
              freelancing, personal projects, and continuous learning. Nearly 1
              year of professional experience at a fintech company. Skilled in
              Next.js/React, TypeScript, Node.js, NestJS, and AWS. Passionate
              about creating efficient, user-friendly applications. Proficient
              in C/C++ and JavaScript.
            </p>
            <p className="text-[15px] sm:text-lg lg:text-xl text-[#ababab] leading-relaxed">
              Currently, I&apos;m focused on expanding my expertise in cloud
              technologies and microservices architecture while staying
              up-to-date with the latest industry trends. I&apos;m always eager
              to take on new challenges and contribute to meaningful projects
              that push the boundaries of what&apos;s possible in tech.
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
