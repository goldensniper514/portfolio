"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        <Header />
        <Banner />
        <div
          className="w-full h-fit bg-[url('/topography.svg')] bg-repeat px-4 py-8 sm:p-14 flex justify-center"
          id="about"
        >
          <div className="w-full rounded-[16px] bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[#2e2e2e] px-4 sm:px-12 py-8">
            <About />
            <Projects />
          </div>
        </div>
        <Education />
        <div
          className="w-full h-fit bg-[url('/topography.svg')] bg-repeat px-4 py-8 sm:p-14 flex justify-center"
          id="contact"
        >
          <div className="w-full rounded-[16px] bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[#2e2e2e] px-4 sm:px-12 py-8">
            <Contact />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
