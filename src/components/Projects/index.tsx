"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  image: string;
  desc: string;
  repo?: string;
  link?: string;
}

const ProjectCard = ({ title, image, desc, repo, link }: ProjectCardProps) => {
  const targetUrl = link || repo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => targetUrl && window.open(targetUrl, "_blank")}
      className="bg-[#2e2e2e50] w-[calc(100%-1rem)] sm:w-[400px] lg:w-[500px] min-h-[400px] sm:min-h-[550px] rounded-2xl overflow-hidden p-2 sm:p-8 border border-[#2e2e2e]
        transition-all duration-100 hover:border-[#343434] cursor-pointer group"
    >
      <motion.div
        className="flex justify-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-[180px] sm:h-[250px] mb-4 rounded-2xl overflow-hidden relative">
          <Image
            src={`/assets/${image}`}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </motion.div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg sm:text-2xl font-bold break-words">{title}</p>
          <div className="flex flex-row gap-2 sm:gap-0">
            {repo && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:opacity-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon icon="bxl:github" className="text-xl sm:text-2xl" />
              </motion.a>
            )}
            {link && (
              <>
                {repo && (
                  <div className="mx-2 sm:mx-4 w-[1px] h-auto bg-[#2e2e2e]" />
                )}
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:opacity-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon
                    icon="material-symbols:link-rounded"
                    className="text-xl sm:text-2xl"
                  />
                </motion.a>
              </>
            )}
          </div>
        </div>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-300">{desc}</p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const projects = [
    {
      title: "Portfolio Website",
      image: "portfolio.jpeg",
      desc: "A personal portfolio website built with Next.js and TailwindCSS to showcase my projects, qualifications, and skills. Features a modern design with smooth animations and responsive layout.",
      repo: "https://github.com/osallak/portfolio",
      link: "https://portfolio-zbbj.vercel.app/",
    },
    {
      title: "Spotify Profile Stats & Dashboard",
      image: "spotify.png",
      desc: "A Spotify profile stats and dashboard built with Next.js and TailwindCSS. It allows you to see your Spotify profile stats and dashboard.",
      repo: "https://github.com/osallak/spotify-wrapped",
      link: "https://spotify-wrapped-xi.vercel.app/",
    },
    {
      title: "Wordle Clone",
      image: "wordle.png",
      desc: "A Wordle clone built with React. It allows you to play the game and see your stats.",
      repo: "https://github.com/osallak/wordle-clone",
      link: "https://react-wordle-orcin.vercel.app/",
    },
    {
      title: "Streamix",
      image: "streamix.png",
      desc: "A movie streaming platform built with Next.js and TailwindCSS. It allows you to stream movies and TV shows ",
      repo: "https://github.com/osallak/streamix",
    },
  ];

  return (
    <div id="projects" className="pt-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 sm:gap-12 mb-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          &lt;Projects/&gt;
        </h2>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[2px] w-full bg-gradient-to-r from-[#2e2e2e] via-purple-500/20 to-[#2e2e2e] origin-left"
        />
      </motion.div>

      <div className="flex flex-wrap gap-2 sm:gap-6 justify-center px-0 sm:px-0">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-12"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/osallak"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#2e2e2e50] px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-[#2e2e2e] transition-all duration-200 hover:border-[#343434]"
        >
          <span className="text-lg sm:text-xl font-semibold">
            See More Projects
          </span>
          <Icon
            icon="bxl:github"
            className="text-2xl transition-all duration-200 group-hover:translate-x-1"
          />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Projects;
