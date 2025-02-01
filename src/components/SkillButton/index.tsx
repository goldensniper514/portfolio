"use client";

import { Icon } from "@iconify-icon/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SkillButtonProps {
  icon: string;
  skill: string;
  isDragging: boolean;
}

const SkillButton = ({ icon, skill, isDragging }: SkillButtonProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `skill-${skill}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 border-2 border-dashed border-[#b520fe40] rounded-lg transition-opacity duration-200 ${
          isDragging ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2e2e2e50] rounded-lg border border-[#2e2e2e] will-change-transform group pl-0.5
          ${
            !isDragging
              ? "hover:border-[#b520fe] hover:bg-[#2e2e2e80] hover:scale-105 hover:shadow-[0_0_15px_rgba(181,32,254,0.3)]"
              : "border-[#b520fe] shadow-[0_0_20px_rgba(181,32,254,0.4)] scale-105 bg-[#2e2e2e80]"
          }
          transition-all duration-200 ease-out cursor-grab active:cursor-grabbing z-10 touch-none
          before:content-['⋮'] before:mr-1 before:text-[#b520fe] before:opacity-0 before:transition-opacity before:duration-200
          hover:before:opacity-100 ${isDragging ? "before:opacity-100" : ""}`}
      >
        <Icon icon={`skill-icons:${icon}`} className="text-lg" />
        <span
          className={`text-[#ababab] text-sm font-medium whitespace-nowrap transition-colors ${
            isDragging ? "text-white" : "group-hover:text-white"
          }`}
        >
          {skill}
        </span>
      </div>
    </div>
  );
};

export default SkillButton;
