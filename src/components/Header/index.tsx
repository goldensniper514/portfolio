"use client";

import { Link } from "react-scroll";

const Header = () => {
  return (
    <div className="fixed top-0 w-full flex items-center justify-center py-4 bg-[#0b0b0b] z-50">
      <div className="flex justify-evenly gap-16">
        <Link
          to="home"
          smooth={true}
          className="text-lg text-white hover:text-gray-300 cursor-pointer transition-colors"
        >
          Home
        </Link>
        <Link
          to="about"
          smooth={true}
          className="text-lg text-white hover:text-gray-300 cursor-pointer transition-colors"
        >
          About
        </Link>
        <Link
          to="projects"
          smooth={true}
          className="text-lg text-white hover:text-gray-300 cursor-pointer transition-colors"
        >
          Projects
        </Link>
        <Link
          to="education"
          smooth={true}
          className="text-lg text-white hover:text-gray-300 cursor-pointer transition-colors"
        >
          Education
        </Link>
        <Link
          to="contact"
          smooth={true}
          className="text-lg text-white hover:text-gray-300 cursor-pointer transition-colors"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Header;
