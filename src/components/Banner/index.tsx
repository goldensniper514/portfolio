"use client";

import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaDownload } from "react-icons/fa6";

const Banner = () => {
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

  return (
    <div className="h-screen w-full overflow-hidden relative" id="home">
      {/* Dot pattern background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px]" />
      </div>

      {/* Content container with dark overlay */}
      <div className="relative z-10 h-full w-full bg-black/30 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold">
          Hi, I&apos;m <span>Oussama!</span>
        </h1>

        {/* Typewriter effect */}
        <h3 className="text-5xl font-bold mt-4">
          Passionate about{" "}
          <span className="bg-gradient-to-r from-[#8c1df3] via-[#f714d1] to-[#621aaf] text-transparent bg-clip-text bg-[length:500%] animate-gradient">
            {typewriterText}
          </span>
          <Cursor cursorStyle="|" />
        </h3>

        {/* Occupation */}
        <h3 className="text-3xl font-thin mt-4">{occupation}</h3>

        {/* Resume Download Button */}
        <a
          href="/resume.pdf"
          download
          className="mt-8 px-6 py-3 bg-gradient-to-r from-[#8c1df3] to-[#621aaf] rounded-full
          text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform
          shadow-lg hover:shadow-purple-500/20"
        >
          <FaDownload className="w-5 h-5" />
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Banner;
