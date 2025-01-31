"use client";

import dynamic from "next/dynamic";
import styles from "./experience.module.css";

const DynamicChrono = dynamic(
  () => import("react-chrono").then((mod) => mod.Chrono),
  {
    ssr: false,
  }
);

const experienceData = [
  {
    title: "September 2024 - Present",
    cardTitle: "Fiverr, Upwork",
    cardSubtitle: "Full-Stack Developer",
    cardDetailedText:
      "An intensive project-based curriculum focused on software engineering, algorithms, and system programming. Part of the prestigious 42 Network known for its peer-to-peer learning methodology.",
  },
  {
    title: "December 2023 - September 2024",
    cardTitle: "Lendstack Inc",
    cardSubtitle: "Software Engineer",
    cardDetailedText:
      "An intensive project-based curriculum focused on software engineering, algorithms, and system programming. Part of the prestigious 42 Network known for its peer-to-peer learning methodology.",
  },
];

const Experience = () => {
  return (
    <div id="experience" style={{ padding: "3.5rem" }}>
      <div className="flex items-center gap-12 mb-0">
        <h1 className="text-5xl font-black whitespace-nowrap">
          &lt;Experience/&gt;
        </h1>
        <span className="h-[2px] w-full bg-[#2e2e2e]" />
      </div>
      <div
        className={`w-full max-w-[1200px] mx-auto [&_.timeline-controls]:!hidden [&_.timeline-main-wrapper]:!px-0 ${styles.timelineWrapper}`}
      >
        <DynamicChrono
          items={experienceData}
          mode="VERTICAL_ALTERNATING"
          disableToolbar
          cardHeight={250}
          theme={{
            primary: "#b520fe",
            secondary: "transparent",
            titleColor: "white",
            titleColorActive: "#b520fe",
            cardBgColor: "#2e2e2e50",
            cardForeColor: "white",
          }}
          classNames={{
            card: styles["teste-card"],
            title: styles["my-title"],
            cardText: styles["card-text"],
          }}
        />
      </div>
    </div>
  );
};

export default Experience;
