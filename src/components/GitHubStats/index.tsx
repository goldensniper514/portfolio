import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitHubStats as GitHubStatsType } from "@/types/github";
import { format } from "date-fns";
import { FaCode, FaCodePullRequest, FaEye, FaHashtag } from "react-icons/fa6";
import { LuGithub, LuCalendarDays } from "react-icons/lu";
import { RiChatHistoryLine } from "react-icons/ri";
import { IoIosFlash } from "react-icons/io";

// Animated stat card with gradient borders and floating effect
const StatCard = ({
  title,
  value,
  icon,
  color,
  delay = 0,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      scale: 1.02,
      boxShadow: `0 8px 20px -6px ${color}15`,
    }}
    className="glass-secondary relative rounded-xl p-5 border border-[#2e2e2e] overflow-hidden"
    style={{
      transition: "all 0.3s ease-out",
    }}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-white font-medium text-2xl">
          {typeof value === "number" ? value.toLocaleString() : "—"}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{title}</p>
      </div>
      <motion.div
        className="text-3xl"
        style={{ color }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
    </div>
  </motion.div>
);

// Interactive contribution heatmap with subtle hover effect
const ContributionHeatmap = ({
  activities,
}: {
  activities: Array<{ date: string; count: number }>;
}) => {
  const maxCount = Math.max(...activities.map((a) => a.count), 1);

  // Create colorscale from low to high activity
  const getColorIntensity = (count: number) => {
    const intensity = count / maxCount;

    // Create gradient from #1a1a1a (low) to #b520fe (high)
    if (intensity === 0) return "#1a1a1a";
    if (intensity < 0.25) return "#3a2a4a";
    if (intensity < 0.5) return "#642d84";
    if (intensity < 0.75) return "#8c28b9";
    return "#b520fe";
  };

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-7 sm:grid-cols-12 md:grid-cols-16 gap-1">
        {activities.map((activity, index) => {
          const color = getColorIntensity(activity.count);
          return (
            <motion.div
              key={activity.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.002 }}
              className="relative group/cell aspect-square"
            >
              <motion.div
                className="w-full h-full rounded border border-transparent cursor-pointer"
                style={{
                  backgroundColor: color,
                  borderColor:
                    activity.count > 0 ? `${color}50` : "transparent",
                }}
                whileHover={{
                  borderColor:
                    activity.count > 0 ? color : "rgba(255,255,255,0.05)",
                  transform: "translateY(-1px)",
                }}
                transition={{
                  duration: 0.15,
                }}
                onClick={() =>
                  window.open(
                    `https://github.com/osallak?tab=overview&from=${activity.date}&to=${activity.date}`,
                    "_blank"
                  )
                }
              />

              {/* Tooltip */}
              <div className="opacity-0 group-hover/cell:opacity-100 pointer-events-none absolute z-20 -top-14 left-1/2 transform -translate-x-1/2 glass-primary rounded-lg px-3 py-2 text-xs whitespace-nowrap transition-opacity duration-200 border border-[#2e2e2e]">
                <div className="font-medium">
                  {format(new Date(activity.date), "MMM d, yyyy")}
                </div>
                <div className="text-white font-medium">
                  <span className="gradient-text">{activity.count}</span>{" "}
                  contribution{activity.count !== 1 && "s"}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 glass-primary border-r border-b border-[#2e2e2e]"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end mt-3 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex mx-2 space-x-1">
          {["#1a1a1a", "#3a2a4a", "#642d84", "#8c28b9", "#b520fe"].map(
            (color) => (
              <div
                key={color}
                className="w-3 h-3 rounded border border-transparent"
                style={{
                  backgroundColor: color,
                  borderColor:
                    color === "#1a1a1a"
                      ? "rgba(255,255,255,0.05)"
                      : `${color}50`,
                }}
              />
            )
          )}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

// Interactive language donut chart with hover effects
const LanguageChart = ({
  languages,
}: {
  languages: GitHubStatsType["languages"];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Calculate stroke-dasharray and stroke-dashoffset for each segment
  const calculateSegments = () => {
    const segments = [];
    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    let startOffset = 0;

    for (let i = 0; i < languages.length; i++) {
      const percentage = languages[i].percentage;
      const dashLength = (percentage / 100) * circumference;

      segments.push({
        offset: startOffset,
        length: dashLength,
        language: languages[i],
      });

      startOffset += dashLength;
    }

    return segments;
  };

  const segments = calculateSegments();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Donut chart */}
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {segments.map((segment, index) => (
            <motion.circle
              key={segment.language.name}
              cx="50"
              cy="50"
              r="35"
              fill="none"
              strokeWidth="12"
              stroke={segment.language.color}
              strokeDasharray={`${segment.length} ${
                2 * Math.PI * 35 - segment.length
              }`}
              strokeDashoffset={-segment.offset}
              initial={{ opacity: 0, strokeDashoffset: 0 }}
              animate={{
                opacity: 1,
                strokeDashoffset: -segment.offset,
                strokeWidth: activeIndex === index ? 13 : 12,
                filter:
                  activeIndex === index
                    ? `drop-shadow(0 0 3px ${segment.language.color})`
                    : "none",
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                strokeWidth: { duration: 0.2 },
                filter: { duration: 0.3 },
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="transition-all cursor-pointer"
              onClick={() =>
                window.open(
                  `https://github.com/osallak?tab=repositories&language=${segment.language.name}`,
                  "_blank"
                )
              }
            />
          ))}
          {/* Center circle with percentage */}
          <circle cx="50" cy="50" r="25" className="fill-[#1a1a1a]" />
        </svg>

        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {activeIndex !== null ? (
            <motion.div
              key={`lang-${activeIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-xl font-semibold text-white">
                {languages[activeIndex].percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {languages[activeIndex].name}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lang-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-semibold gradient-text"
            >
              Languages
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto md:flex-1">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            whileHover={{
              scale: 1.03,
              y: -2,
              transition: { duration: 0.2, type: "spring", stiffness: 400 },
            }}
            className="flex items-center space-x-2 glass-tertiary rounded-full px-3 py-1.5 border border-[#2e2e2e] cursor-pointer"
            style={{
              boxShadow:
                activeIndex === index ? `0 0 12px ${lang.color}40` : "none",
              borderColor: activeIndex === index ? lang.color : "#2e2e2e",
              transition:
                "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() =>
              window.open(
                `https://github.com/osallak?tab=repositories&language=${lang.name}`,
                "_blank"
              )
            }
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-white">{lang.name}</span>
            <span className="text-xs text-gray-400">
              {lang.percentage.toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Streak indicator component
const StreakIndicator = ({ days = 0 }: { days?: number }) => {
  return (
    <motion.div
      className="glass-secondary rounded-xl p-5 border border-[#2e2e2e] flex items-center space-x-4 relative overflow-hidden"
      whileHover={{
        borderColor: "#b520fe50",
        boxShadow: "0 10px 25px -5px rgba(181, 32, 254, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle animated gradient background for streak */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, #621aaf 0%, #8c1df3 50%, #b520fe 100%)`,
          filter: "blur(20px)",
          transform: "translate(-30%, 0)",
        }}
      />

      <motion.div
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1a1a1a] relative z-10"
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <motion.div
          style={{
            background:
              "linear-gradient(135deg, #621aaf 0%, #8c1df3 50%, #b520fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="text-3xl"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <IoIosFlash />
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-baseline">
          <h3 className="text-white font-medium text-2xl mr-2">{days}</h3>
          <p className="text-gray-400 text-sm">day streak</p>
        </div>
        <p className="text-gray-400 text-xs mt-1">Keep up the momentum!</p>
      </div>
    </motion.div>
  );
};

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="space-y-5 sm:space-y-6 w-full">
    {/* Stats cards skeleton */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      <div className="col-span-2 md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="glass-secondary rounded-xl p-5 border border-[#2e2e2e] animate-pulse"
          >
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-6 w-16 bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Streak skeleton */}
      <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2">
        <div className="glass-secondary rounded-xl p-5 border border-[#2e2e2e] animate-pulse flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-gray-700"></div>
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Contribution heatmap skeleton */}
    <div className="glass-secondary rounded-xl p-5 sm:p-6 border border-[#2e2e2e] animate-pulse">
      <div className="h-5 w-32 bg-gray-700 rounded mb-6"></div>
      <div className="w-full h-[150px]">
        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 h-full">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="aspect-square w-full bg-gray-800 rounded-sm"
              style={{
                opacity: 0.2 + Math.random() * 0.8,
                height: `${20 + Math.random() * 80}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>

    {/* Language chart skeleton */}
    <div className="glass-secondary rounded-xl p-5 sm:p-6 border border-[#2e2e2e] animate-pulse">
      <div className="h-5 w-40 bg-gray-700 rounded mb-6"></div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="h-[200px] w-[200px] rounded-full bg-gray-800 relative">
          <div className="absolute inset-0 rounded-full border-[20px] border-gray-700 opacity-50"></div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto md:flex-1 mt-4 md:mt-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-gray-800 flex items-center px-3"
              style={{ width: `${70 + Math.random() * 60}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA skeleton */}
    <div className="flex justify-center mt-5 sm:mt-8">
      <div
        className="glass-tertiary rounded-full px-6 py-3 border border-[#2e2e2e] animate-pulse flex items-center space-x-2"
        style={{ width: "180px" }}
      >
        <div className="h-5 w-5 rounded-full bg-gray-700"></div>
        <div className="h-4 w-28 bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/github-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching GitHub stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate current streak (dummy implementation - would need actual data from API)
  const currentStreak = stats
    ? stats.contributionsByDay
        .filter((day) => day.count > 0)
        .filter(
          (_, i, arr) =>
            i === 0 ||
            new Date(arr[i - 1].date).getDate() -
              new Date(arr[i].date).getDate() ===
              1
        ).length
    : 0;

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-2">
          <LuGithub className="text-2xl sm:text-3xl gradient-text" />
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
            GitHub Stats
          </h2>
        </div>

        {!isLoading && !error && stats && (
          <motion.a
            href={`https://github.com/osallak`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 flex items-center hover:text-white transition-colors duration-200"
            whileHover={{ x: 5 }}
          >
            View Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>
        )}
      </motion.div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="glass-secondary rounded-xl p-8 border border-[#2e2e2e] flex flex-col items-center justify-center text-center">
          <div className="text-red-400 mb-4 text-5xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            Failed to load GitHub data
          </h3>
          <p className="text-gray-400 max-w-md">
            There was an issue connecting to GitHub. Please try again later or
            check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 glass-tertiary rounded-full px-4 py-2 border border-[#2e2e2e] text-white hover:border-[#b520fe] transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      ) : stats ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5 sm:space-y-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Main stats grid with responsive layout */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-3 sm:gap-4">
              <StatCard
                title="Contributions"
                value={stats.totalContributions}
                icon={<FaHashtag />}
                color="#b520fe"
                delay={0.1}
              />
              <StatCard
                title="Commits"
                value={stats.activityBreakdown.commits}
                icon={<FaCode />}
                color="#8c1df3"
                delay={0.2}
              />
              <StatCard
                title="Pull Requests"
                value={stats.activityBreakdown.pullRequests}
                icon={<FaCodePullRequest />}
                color="#f714d1"
                delay={0.3}
              />
              <StatCard
                title="Reviews"
                value={stats.activityBreakdown.reviews}
                icon={<FaEye />}
                color="#621aaf"
                delay={0.4}
              />
            </div>

            {/* Streak indicator spans columns based on screen */}
            <motion.div
              className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <StreakIndicator days={currentStreak} />
            </motion.div>
          </div>

          {/* Contribution heatmap with animated entry */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-secondary rounded-xl p-5 sm:p-6 border border-[#2e2e2e] overflow-hidden"
            whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <LuCalendarDays className="text-lg text-gray-400" />
              <h3 className="text-lg font-medium text-white">
                Contribution Activity
              </h3>
            </div>
            <ContributionHeatmap activities={stats.contributionsByDay} />
          </motion.div>

          {/* Language distribution with interactive donut chart */}
          {stats.languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass-secondary rounded-xl p-5 sm:p-6 border border-[#2e2e2e]"
              whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <RiChatHistoryLine className="text-lg text-gray-400" />
                <h3 className="text-lg font-medium text-white">
                  Language Distribution
                </h3>
              </div>
              <LanguageChart languages={stats.languages} />
            </motion.div>
          )}

          {/* GitHub profile CTA button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-5 sm:mt-8"
          >
            <motion.a
              href="https://github.com/osallak"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-tertiary group rounded-full border border-[#2e2e2e] px-5 sm:px-6 py-2.5 sm:py-3 flex items-center space-x-2 hover:border-[#b520fe] transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <LuGithub className="text-lg sm:text-xl text-white group-hover:text-[#b520fe] transition-colors duration-300" />
              <span className="text-sm sm:text-base text-white font-medium">
                Visit GitHub Profile
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      ) : null}

      {/* Add keyframes for any animations */}
      <style jsx>{`
        @keyframes borderShine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
