import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitHubStats as GitHubStatsType } from "@/types/github";
import { format } from "date-fns";

const ActivityCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group relative bg-[#1a1a1a40] backdrop-blur-sm rounded-lg p-3 border border-[#2e2e2e] hover:border-[#b520fe] hover:shadow-[0_0_15px_rgba(181,32,254,0.3)] transition-all duration-200 cursor-pointer"
  >
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl">{icon}</div>
      <div className="min-w-0 w-full mt-1.5">
        <div className="text-white font-medium text-xl truncate">
          {value.toLocaleString()}
        </div>
        <div className="text-gray-400 text-xs truncate">{title}</div>
      </div>
    </div>
  </motion.div>
);

const ActivityTimeline = ({
  activities,
}: {
  activities: Array<{ date: string; count: number }>;
}) => {
  const maxCount = Math.max(...activities.map((a) => a.count));

  return (
    <div className="relative h-[150px] w-full overflow-visible">
      <div className="absolute inset-0 flex items-end justify-between px-1">
        {activities.map((activity, index) => {
          const height = activity.count ? (activity.count / maxCount) * 100 : 0;
          const delay = index * 0.02;

          return (
            <motion.div
              key={activity.date}
              className="relative group h-full flex items-end px-[1px]"
              style={{ flex: "1" }}
            >
              <motion.div
                className="w-full"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="w-full h-full relative group/bar cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() =>
                    window.open(
                      `https://github.com/osallak?tab=overview&from=${activity.date}&to=${activity.date}`,
                      "_blank"
                    )
                  }
                >
                  <div
                    className="w-full h-full rounded-[4px] bg-gradient-to-t from-[#2e2e2e] to-[#404040] border border-[#2e2e2e] group-hover/bar:border-[#b520fe] group-hover/bar:shadow-[0_0_15px_rgba(181,32,254,0.3)] transition-all duration-200"
                    style={{
                      opacity: 0.7 + (height / 100) * 0.3,
                    }}
                  />
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover/bar:opacity-100 pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-[100] border border-[#2e2e2e] shadow-lg transition-opacity duration-200">
                    <div className="font-medium text-sm">
                      {format(new Date(activity.date), "MMM d, yyyy")}
                    </div>
                    <div className="text-[#b520fe] font-medium mt-1">
                      {activity.count} contribution
                      {activity.count !== 1 ? "s" : ""}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-px bg-[#2e2e2e40]" />
        ))}
      </div>
    </div>
  );
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }
        const data = await response.json();
        console.log("Fetched stats:", data); // Debug log
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching GitHub stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#b520fe] to-[#e2a6f8] text-transparent bg-clip-text">
          # GitHub Activity
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-[16px] bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/[0.05] p-4 sm:p-6 hover:border-white/[0.1] transition-colors"
      >
        <div className="space-y-5 sm:space-y-6">
          {/* Activity Cards */}
          {stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <ActivityCard
                title="Total Contributions"
                value={stats.totalContributions}
                icon="🎯"
              />
              <ActivityCard
                title="Commits"
                value={stats.activityBreakdown.commits}
                icon="📝"
              />
              <ActivityCard
                title="Pull Requests"
                value={stats.activityBreakdown.pullRequests}
                icon="🔄"
              />
              <ActivityCard
                title="Code Reviews"
                value={stats.activityBreakdown.reviews}
                icon="👀"
              />
            </div>
          )}

          {/* Activity Timeline */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-gray-400 text-xs sm:text-sm">
              Activity Timeline
            </div>
            {stats ? (
              <div className="bg-[#1a1a1a40] backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-[#2e2e2e] hover:border-white/10 transition-colors">
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-2">
                  <span>
                    {format(
                      new Date(stats.contributionsByDay[0].date),
                      "MMM d, yyyy"
                    )}
                  </span>
                  <span>
                    {format(
                      new Date(
                        stats.contributionsByDay[
                          stats.contributionsByDay.length - 1
                        ].date
                      ),
                      "MMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="relative">
                  <ActivityTimeline activities={stats.contributionsByDay} />
                </div>
              </div>
            ) : (
              <div className="h-40 bg-[#1a1a1a40] rounded-lg flex items-center justify-center border border-[#2e2e2e]">
                <span className="text-gray-400 text-sm">
                  Loading activity...
                </span>
              </div>
            )}
          </div>

          {/* Language Distribution */}
          {stats && stats.languages.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-gray-400 text-xs sm:text-sm">
                Top Languages
              </div>
              <div className="bg-[#1a1a1a40] backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-[#2e2e2e] hover:border-white/10 transition-colors">
                <div className="h-2 sm:h-3 bg-black/20 rounded-full overflow-hidden flex">
                  {stats.languages.map((lang) => (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ backgroundColor: lang.color }}
                      className="h-full transition-all duration-300"
                    />
                  ))}
                  {/* Add the "Other" category bar if total is less than 100% */}
                  {stats.languages.reduce(
                    (acc, lang) => acc + lang.percentage,
                    0
                  ) < 100 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          100 -
                          stats.languages.reduce(
                            (acc, lang) => acc + lang.percentage,
                            0
                          )
                        }%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ backgroundColor: "#2e2e2e" }}
                      className="h-full transition-all duration-300"
                    />
                  )}
                </div>
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                  {stats.languages.map((lang) => (
                    <motion.div
                      key={lang.name}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-1.5 bg-[#2e2e2e50] backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-[#2e2e2e] hover:border-[#b520fe] hover:shadow-[0_0_15px_rgba(181,32,254,0.3)] transition-all duration-200 cursor-pointer"
                    >
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-xs sm:text-sm text-white">
                        {lang.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {lang.percentage.toFixed(1)}%
                      </span>
                    </motion.div>
                  ))}
                  {/* Add the "Other" category tag if total is less than 100% */}
                  {stats.languages.reduce(
                    (acc, lang) => acc + lang.percentage,
                    0
                  ) < 100 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-1.5 bg-[#2e2e2e50] backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-[#2e2e2e] hover:border-[#b520fe] hover:shadow-[0_0_15px_rgba(181,32,254,0.3)] transition-all duration-200 cursor-pointer"
                    >
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{ backgroundColor: "#2e2e2e" }}
                      />
                      <span className="text-xs sm:text-sm text-white">
                        Other
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {(
                          100 -
                          stats.languages.reduce(
                            (acc, lang) => acc + lang.percentage,
                            0
                          )
                        ).toFixed(1)}
                        %
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
