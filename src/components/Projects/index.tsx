import { Icon } from "@iconify/react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  image: string;
  desc: string;
  repo?: string;
  link?: string;
}

const ProjectCard = ({ title, image, desc, repo, link }: ProjectCardProps) => {
  return (
    <div className="bg-[#2e2e2e50] w-[500px] min-h-[550px] rounded-2xl overflow-hidden p-8 border border-[#2e2e2e] transition-all duration-100 hover:border-[#343434]">
      <div className="flex justify-center">
        <div className="w-full h-[250px] mb-4 rounded-2xl overflow-hidden relative">
          <Image
            src={`/assets/${image}`}
            alt={title}
            fill
            className="object-cover transition-all duration-100"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-bold break-words">{title}</p>
          <div className="flex flex-row">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:opacity-50"
              >
                <Icon icon="bxl:github" className="text-2xl" />
              </a>
            )}
            {link && (
              <>
                {repo && <div className="mx-4 w-[1px] h-auto bg-[#2e2e2e]" />}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:opacity-50"
                >
                  <Icon
                    icon="material-symbols:link-rounded"
                    className="text-2xl"
                  />
                </a>
              </>
            )}
          </div>
        </div>
        <p className="mt-4 text-lg">{desc}</p>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      image: "portfolio.jpeg",
      desc: "A personal portfolio website built with Next.js and TailwindCSS to showcase my projects, qualifications, and skills. Features a modern design with smooth animations and responsive layout.",
      repo: "https://github.com/osallak/portfolio",
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
    <div id="projects" className="pt-4">
      <div className="flex items-center gap-12 mb-8">
        <h1 className="text-5xl font-black whitespace-nowrap">
          &lt;Projects/&gt;
        </h1>
        <span className="h-[2px] w-full bg-[#2e2e2e]" />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/osallak"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#2e2e2e50] px-8 py-4 rounded-xl border border-[#2e2e2e] transition-all duration-200 hover:border-[#343434]"
        >
          <span className="text-xl font-semibold">See More Projects</span>
          <Icon
            icon="bxl:github"
            className="text-2xl transition-all duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>
    </div>
  );
};

export default Projects;
