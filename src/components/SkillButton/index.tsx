"use client";

import { Icon } from "@iconify-icon/react";

interface SkillButtonProps {
  icon: string;
  skill: string;
}

const SkillButton = ({ icon, skill }: SkillButtonProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#2e2e2e50] rounded-lg border border-[#2e2e2e] hover:border-[#b520fe] hover:bg-[#2e2e2e80] hover:scale-105 hover:shadow-[0_0_15px_rgba(181,32,254,0.3)] transition-all duration-300 ease-in-out cursor-pointer">
      <Icon icon={`skill-icons:${icon}`} className="text-2xl" />
      <span className="text-[#ababab] group-hover:text-white transition-colors">
        {skill}
      </span>
    </div>
  );
};

export default SkillButton;
