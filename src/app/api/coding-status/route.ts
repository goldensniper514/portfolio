import { NextResponse } from 'next/server';
import { WakaTimeResponse, WakaTimeLanguage } from '@/types/wakatime';

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
let cachedData: WakaTimeResponse | null = null;
let lastFetch = 0;

async function fetchWakaTimeData(): Promise<WakaTimeResponse> {
  if (!WAKATIME_API_KEY) {
    throw new Error('WAKATIME_API_KEY is not set');
  }

  const now = Date.now();
  if (cachedData && now - lastFetch < CACHE_TIME) {
    return cachedData;
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
  };

  // Fetch today's coding activity
  const summaryResponse = await fetch(
    'https://wakatime.com/api/v1/users/current/summaries?start=today&end=today',
    { headers }
  );

  // Fetch current user's status
  const statusResponse = await fetch(
    'https://wakatime.com/api/v1/users/current/status_bar/today',
    { headers }
  );

  if (!summaryResponse.ok || !statusResponse.ok) {
    throw new Error('Failed to fetch Wakatime data');
  }

  const summaryData = await summaryResponse.json();
  const statusData = await statusResponse.json();

  // Combine both responses
  const data: WakaTimeResponse = {
    summary: summaryData,
    status: statusData
  };

  cachedData = data;
  lastFetch = now;

  return data;
}

export async function GET() {
  try {
    const wakaTimeData = await fetchWakaTimeData();
    const todayData = wakaTimeData.summary.data[0];
    const statusData = wakaTimeData.status.data;

    if (!todayData) {
      return NextResponse.json({
        isCurrentlyCoding: false,
        todayStats: {
          totalTime: '0 minutes',
          languages: [],
        },
      });
    }

    // Process languages data
    const languages = todayData.languages.map((lang: WakaTimeLanguage) => ({
      name: lang.name,
      percent: lang.percent,
      totalSeconds: lang.total_seconds,
      text: lang.text,
    }));

    return NextResponse.json({
      isCurrentlyCoding: statusData.status === 'coding',
      lastActive: statusData.status_date,
      todayStats: {
        totalTime: todayData.grand_total.text,
        languages,
        currentProject: statusData.project,
        currentLanguage: languages[0]?.name,
        currentFile: statusData.full_project_name,
      },
    });
  } catch (error) {
    console.error('Error fetching coding status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coding status' },
      { status: 500 }
    );
  }
}
