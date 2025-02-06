export interface GitHubStats {
  totalContributions: number;
  activityBreakdown: {
    commits: number;
    issues: number;
    pullRequests: number;
    reviews: number;
  };
  contributionsByDay: {
    date: string;
    count: number;
  }[];
  languages: {
    name: string;
    percentage: number;
    color: string;
  }[];
}
