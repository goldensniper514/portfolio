"use client";

import Skills from "../Skills";

const About = () => {
  return (
    <>
      {/* Title section */}
      <div className="flex items-center gap-12 mb-8">
        <h1 className="text-5xl font-black whitespace-nowrap">
          &lt;About Me/&gt;
        </h1>
        <span className="h-[2px] w-full bg-[#2e2e2e]" />
      </div>

      {/* Content section */}
      <div className="flex gap-12 justify-between">
        {/* Text section */}
        <div className="flex flex-col gap-5">
          <p className="text-xl text-[#ababab] text-justify">
            I am a passionate software engineer with a strong foundation in
            full-stack development. My journey in technology has been driven by
            a deep curiosity and desire to create innovative solutions. I
            specialize in building robust web applications and have experience
            with modern development tools and practices.
          </p>
          <p className="text-xl text-[#ababab] text-justify">
            Currently, I'm focused on expanding my expertise in cloud
            technologies and microservices architecture while staying up-to-date
            with the latest industry trends. I'm always eager to take on new
            challenges and contribute to meaningful projects that push the
            boundaries of what's possible in tech.
          </p>
        </div>

        {/* Skills section */}
        <Skills />
      </div>
    </>
  );
};

export default About;
