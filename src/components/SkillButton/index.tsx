"use client";

import { Icon } from "@iconify-icon/react";

interface SkillButtonProps {
  icon: string;
  skill: string;
}

const SkillButton = ({ icon, skill }: SkillButtonProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#2e2e2e50] rounded-lg border border-[#2e2e2e] hover:border-[#343434] transition-colors">
      <Icon icon={`skill-icons:${icon}`} className="text-2xl" />
      <span>{skill}</span>
    </div>
  );
};

export default SkillButton;
