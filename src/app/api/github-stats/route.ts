import { NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "osallak"; // Your GitHub username

interface LanguageEdge {
  size: number;
  node: {
    color: string;
    name: string;
  };
}

interface Repository {
  languages: {
    edges: LanguageEdge[];
  };
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
        contributionYears: number[];
        totalCommitContributions: number;
        totalIssueContributions: number;
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
      };
      repositories: {
        nodes: Repository[];
      };
    };
  };
}

// GraphQL query to fetch contribution data
const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
        contributionYears
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GitHub token is not configured");
    }

    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    const data = (await response.json()) as GitHubGraphQLResponse;

    if ('errors' in data) {
      throw new Error((data as { errors: { message: string }[] }).errors[0].message);
    }

    const contributionData = data.data.user.contributionsCollection;
    const repositories = data.data.user.repositories.nodes;

    // Process languages
    const languageMap = new Map<string, { size: number; color: string }>();
    let totalSize = 0;

    repositories.forEach((repo) => {
      if (repo.languages.edges) {
        repo.languages.edges.forEach((edge) => {
          const { name, color } = edge.node;
          const size = edge.size;
          totalSize += size;

          if (languageMap.has(name)) {
            const existing = languageMap.get(name)!;
            languageMap.set(name, {
              size: existing.size + size,
              color,
            });
          } else {
            languageMap.set(name, { size, color });
          }
        });
      }
    });

    const languages = Array.from(languageMap.entries())
      .map(([name, { size, color }]) => ({
        name,
        percentage: (size / totalSize) * 100,
        color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Process contribution data
    const contributionDays = contributionData.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30); // Get last 30 days

    return NextResponse.json({
      totalContributions: contributionData.contributionCalendar.totalContributions,
      activityBreakdown: {
        commits: contributionData.totalCommitContributions,
        issues: contributionData.totalIssueContributions,
        pullRequests: contributionData.totalPullRequestContributions,
        reviews: contributionData.totalPullRequestReviewContributions,
      },
      contributionsByDay: contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
      languages,
    });
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics" },
      { status: 500 }
    );
  }
}
