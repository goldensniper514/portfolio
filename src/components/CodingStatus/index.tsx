import { useEffect, useState } from "react";
import useSWR from "swr";
import { CodingStatus as CodingStatusType } from "@/types/wakatime";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const REFRESH_INTERVAL = 30 * 1000; // 30 seconds
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CodingStatus() {
  const { data, error, isLoading, mutate } = useSWR<CodingStatusType>(
    "/api/coding-status",
    fetcher,
    {
      refreshInterval: REFRESH_INTERVAL,
    }
  );

  const [nextUpdate, setNextUpdate] = useState(REFRESH_INTERVAL);

  // Update countdown to next refresh
  useEffect(() => {
    setNextUpdate(REFRESH_INTERVAL);
    const interval = setInterval(() => {
      setNextUpdate((prev) => {
        if (prev <= 1000) {
          mutate(); // Trigger refresh when countdown reaches 0
          return REFRESH_INTERVAL;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mutate]);

  const handleRefresh = () => {
    mutate();
    setNextUpdate(REFRESH_INTERVAL);
  };

  if (error) return null;
  if (isLoading) return null;
  if (!data) return null;

  const isJustStarted = data.todayStats.totalTime === "0 mins";
  const nextUpdateInSeconds = Math.ceil(nextUpdate / 1000);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Coding Activity</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Refresh
          </button>
          <span className="text-xs text-gray-500">
            (updates in {nextUpdateInSeconds}s)
          </span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-[16px] bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/[0.05] p-6 hover:border-white/[0.1] transition-colors"
      >
        <div className="space-y-6">
          {/* Status and Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-3 h-3 rounded-full animate-pulse",
                  data.isCurrentlyCoding || isJustStarted
                    ? "bg-green-500"
                    : "bg-yellow-500"
                )}
              />
              <span className="text-white font-medium">Currently Coding</span>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-sm">Today&apos;s Time</div>
              <div className="text-white font-medium">
                {data.todayStats.totalTime}
              </div>
            </div>
          </div>

          {/* Project and Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.todayStats.currentProject && (
              <div className="bg-white/[0.03] rounded-lg p-4 hover:bg-white/[0.05] transition-colors">
                <div className="text-gray-400 text-sm mb-1">
                  Current Project
                </div>
                <div className="text-white font-medium truncate">
                  {data.todayStats.currentProject}
                </div>
              </div>
            )}
            {data.todayStats.currentLanguage && (
              <div className="bg-white/[0.03] rounded-lg p-4 hover:bg-white/[0.05] transition-colors">
                <div className="text-gray-400 text-sm mb-1">Main Language</div>
                <div className="text-white font-medium">
                  {data.todayStats.currentLanguage}
                </div>
              </div>
            )}
          </div>

          {/* Language Distribution */}
          {data.todayStats.languages.length > 0 && (
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">Language Distribution</div>
              <div className="h-3 bg-white/[0.03] rounded-full overflow-hidden">
                {data.todayStats.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full float-left transition-all duration-300"
                    style={{
                      width: `${lang.percent}%`,
                      backgroundColor: getLanguageColor(lang.name),
                    }}
                    title={`${lang.name}: ${lang.text}`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {data.todayStats.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center space-x-1.5 bg-white/[0.03] rounded-full px-4 py-1.5 hover:bg-white/[0.05] transition-colors"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getLanguageColor(lang.name) }}
                    />
                    <span className="text-sm text-white">{lang.name}</span>
                    <span className="text-sm text-gray-400">
                      {lang.text} ({lang.percent.toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// Simple function to get a consistent color for each language
function getLanguageColor(language: string): string {
  const colors = [
    "#2ecc71", // Green
    "#3498db", // Blue
    "#9b59b6", // Purple
    "#e74c3c", // Red
    "#f1c40f", // Yellow
    "#1abc9c", // Turquoise
    "#e67e22", // Orange
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < language.length; i++) {
    hash = language.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
