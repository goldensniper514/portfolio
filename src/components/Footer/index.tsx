import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center space-x-8">
          <Link
            href="https://github.com/osallak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/osallak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </Link>
          <Link
            href="https://twitter.com/uss4ma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaXTwitter className="w-6 h-6" />
          </Link>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} Oussama Sallak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
