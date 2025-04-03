import Link from "next/link";
import { FaGithub, FaXTwitter, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center space-x-8">
          <Link
            href="https://github.com/goldensniper514"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </Link>
          <Link
            href="https://x.com/goldensniper514"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaXTwitter className="w-6 h-6" />
          </Link>
          <Link
            href="https://t.me/goldensniper0514"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTelegram className="w-6 h-6" />
          </Link>         
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} Logan Fujikawa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
