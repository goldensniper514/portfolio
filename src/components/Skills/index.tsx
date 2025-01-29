"use client";

import SkillButton from "../SkillButton";

const Skills = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold text-white"># Skills</span>
      <div className="flex flex-wrap gap-4">
        <SkillButton icon="typescript" skill="TypeScript" />
        <SkillButton icon="javascript" skill="JavaScript" />
        <SkillButton icon="react-dark" skill="React" />
        <SkillButton icon="nextjs-dark" skill="Next.js" />
        <SkillButton icon="tailwindcss-dark" skill="Tailwind" />
        <SkillButton icon="nodejs-dark" skill="Node.js" />
        <SkillButton icon="python-dark" skill="Python" />
        <SkillButton icon="cpp" skill="C++" />
        <SkillButton icon="git" skill="Git" />
        <SkillButton icon="github-dark" skill="GitHub" />
        <SkillButton icon="docker" skill="Docker" />
        <SkillButton icon="linux-dark" skill="Linux" />
        <SkillButton icon="mysql-dark" skill="MySQL" />
        <SkillButton icon="postgresql-dark" skill="PostgreSQL" />
      </div>
    </div>
  );
};

export default Skills;
