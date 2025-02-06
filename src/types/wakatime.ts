export interface WakaTimeLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  text: string;
  digital: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface WakaTimeGrandTotal {
  total_seconds: number;
  text: string;
  digital: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface WakaTimeSummaryData {
  grand_total: WakaTimeGrandTotal;
  languages: WakaTimeLanguage[];
  range: {
    start: string;
    end: string;
  };
}

export interface WakaTimeStatusData {
  status: 'coding' | 'building' | 'indexing' | 'debugging' | 'browsing' | 'away';
  status_date: string;
  project: string;
  full_project_name: string;
}

export interface WakaTimeResponse {
  summary: {
    data: WakaTimeSummaryData[];
  };
  status: {
    data: WakaTimeStatusData;
  };
}

export interface WakaTimeStatus {
  data: {
    grand_total: {
      total_seconds: number;
      human_readable_total: string;
    };
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    projects: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    range: {
      start: string;
      end: string;
    };
  };
}

export interface CodingStatus {
  isCurrentlyCoding: boolean;
  lastActive?: string;
  todayStats: {
    totalTime: string;
    languages: Array<{
      name: string;
      percent: number;
      totalSeconds: number;
      text: string;
    }>;
    currentProject?: string;
    currentLanguage?: string;
    currentFile?: string;
  };
}
