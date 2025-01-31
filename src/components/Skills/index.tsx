"use client";

import React from "react";
import {
  DndContext,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SkillButton from "../SkillButton";
import { useState } from "react";

const Skills = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors with lower activation constraints for easier dragging
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // Start dragging after moving 5px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100, // Reduce delay for touch devices
      tolerance: 5, // Allow some movement during the delay
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold text-white"># Skills</span>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative flex flex-wrap items-start gap-2 min-h-[250px] bg-[#2e2e2e20] rounded-xl p-4 border border-[#2e2e2e] overflow-hidden group/container">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#585858_1px,_transparent_1px),radial-gradient(circle,_#585858_1.2px,_transparent_1.2px)] bg-[length:40px_40px] opacity-20" />

          {/* Hint text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[#b520fe40] text-lg font-medium transition-opacity duration-300 select-none
              group-hover/container:opacity-0 group-focus-within/container:opacity-0 group-active/container:opacity-0
              ${activeId ? 'opacity-0' : 'opacity-100'}"
            >
              Drag skills to rearrange
            </span>
          </div>

          {/* Skills */}
          <div className="relative z-10 flex flex-wrap items-start gap-2">
            <SkillButton
              icon="typescript"
              skill="TypeScript"
              isDragging={activeId === "skill-TypeScript"}
            />
            <SkillButton
              icon="javascript"
              skill="JavaScript"
              isDragging={activeId === "skill-JavaScript"}
            />
            <SkillButton
              icon="react-dark"
              skill="React"
              isDragging={activeId === "skill-React"}
            />
            <SkillButton
              icon="nextjs-dark"
              skill="Next.js"
              isDragging={activeId === "skill-Next.js"}
            />
            <SkillButton
              icon="tailwindcss-dark"
              skill="Tailwind"
              isDragging={activeId === "skill-Tailwind"}
            />
            <SkillButton
              icon="nodejs-dark"
              skill="Node.js"
              isDragging={activeId === "skill-Node.js"}
            />
            <SkillButton
              icon="python-dark"
              skill="Python"
              isDragging={activeId === "skill-Python"}
            />
            <SkillButton
              icon="cpp"
              skill="C++"
              isDragging={activeId === "skill-C++"}
            />
            <SkillButton
              icon="git"
              skill="Git"
              isDragging={activeId === "skill-Git"}
            />
            <SkillButton
              icon="github-dark"
              skill="GitHub"
              isDragging={activeId === "skill-GitHub"}
            />
            <SkillButton
              icon="docker"
              skill="Docker"
              isDragging={activeId === "skill-Docker"}
            />
            <SkillButton
              icon="linux-dark"
              skill="Linux"
              isDragging={activeId === "skill-Linux"}
            />
            <SkillButton
              icon="mysql-dark"
              skill="MySQL"
              isDragging={activeId === "skill-MySQL"}
            />
            <SkillButton
              icon="postgresql-dark"
              skill="PostgreSQL"
              isDragging={activeId === "skill-PostgreSQL"}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default Skills;
