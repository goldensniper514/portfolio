"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  DndContext,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// Dynamically import SkillButton with no SSR
const SkillButton = dynamic(() => import("../SkillButton"), {
  ssr: false,
});

const Skills = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [skills, setSkills] = useState([
    { icon: "typescript", name: "TypeScript" },
    { icon: "javascript", name: "JavaScript" },
    { icon: "python-dark", name: "Python" },
    { icon: "cpp", name: "C++" },
    { icon: "react-dark", name: "React" },
    { icon: "nextjs-dark", name: "Next.js" },
    { icon: "tailwindcss-dark", name: "Tailwind" },
    { icon: "nodejs-dark", name: "Node.js" },
    { icon: "fastapi", name: "FastAPI" },
    { icon: "django", name: "Django" },
    { icon: "laravel", name: "Laravel" },
    { icon: "postgresql-dark", name: "PostgreSQL" },
    { icon: "mongodb", name: "MongoDB" },
    { icon: "mysql-dark", name: "MySQL" },
    { icon: "docker", name: "Docker" },
    { icon: "kubernetes", name: "Kubernetes" },
    { icon: "aws-dark", name: "AWS" },
    { icon: "github-dark", name: "GitHub" },
    { icon: "git", name: "Git" },
    { icon: "linux-dark", name: "Linux" },
  ]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex(
          (item) => `skill-${item.name}` === active.id
        );
        const newIndex = items.findIndex(
          (item) => `skill-${item.name}` === over.id
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          # Technical Skills
        </h3>
        <div className="relative min-h-[250px] bg-[#2e2e2e20] rounded-xl p-4 sm:p-6 border border-[#2e2e2e] overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px] opacity-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        # Technical Skills
      </h3>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="relative flex flex-wrap items-start gap-2 min-h-[250px] bg-[#2e2e2e20] rounded-xl p-4 sm:p-6 border border-[#2e2e2e] overflow-hidden group/container backdrop-blur-sm">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px] opacity-20" />

          {/* Hint text */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center p-4 pointer-events-none">
            <span
              className={`text-[#b520fe40] text-base sm:text-lg font-medium transition-opacity duration-300 select-none
              group-hover/container:opacity-0 group-focus-within/container:opacity-0 group-active/container:opacity-0
              ${activeId ? "opacity-0" : "opacity-100"}`}
            >
              Drag skills to rearrange
            </span>
          </div>

          {/* Skills */}
          <div className="relative z-10 flex flex-wrap items-start gap-4 w-full justify-center sm:justify-evenly pt-12">
            <SortableContext
              items={skills.map((skill) => `skill-${skill.name}`)}
              strategy={rectSortingStrategy}
            >
              {skills.map((skill) => (
                <SkillButton
                  key={skill.name}
                  icon={skill.icon}
                  skill={skill.name}
                  isDragging={activeId === `skill-${skill.name}`}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default Skills;
