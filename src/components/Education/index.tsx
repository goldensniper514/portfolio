"use client";

import { Chrono } from "react-chrono";
import styles from "./education.module.css";

const educationData = [
  {
    title: "2021 - Present",
    cardTitle: "Software Engineering",
    cardSubtitle: "1337 School (42 Network) - Programming School",
    cardDetailedText:
      "An intensive project-based curriculum focused on software engineering, algorithms, and system programming. Part of the prestigious 42 Network known for its peer-to-peer learning methodology.",
  },
  {
    "title": "2018 - 2021",
    "cardTitle": "Economics and Management",
    "cardSubtitle": "Faculty of Economics and Management - University Hassan I",
    "cardDetailedText": "Studied economics and management with focus on data analysis and business systems, developing analytical skills that complement software engineering."
  },
  {
    title: "2018",
    cardTitle: "High School Diploma",
    cardSubtitle: "Economics and Management",
    cardDetailedText:
      "Completed secondary education with focus on scientific subjects including mathematics, economics, and management.",
  },
];

const Education = () => {
  return (
    <div id="education" style={{ padding: "3.5rem" }}>
      <div className="w-full max-w-[1200px] mx-auto [&_.timeline-controls]:!hidden [&_.timeline-main-wrapper]:!px-0">
        <Chrono
          items={educationData}
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

export default Education;
