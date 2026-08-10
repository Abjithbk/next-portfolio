import { NextResponse } from 'next/server';

type GitHubContributionDay = { contributionCount: number; date: string };
type GitHubContributionWeek = { contributionDays: GitHubContributionDay[] };
type GitHubGraphResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: GitHubContributionWeek[];
        };
      };
    };
  };
  errors?: unknown[];
};

export async function GET() {
  const username = 'Abjithbk';
  const token = process.env.GITHUB_TOKEN;

  // Fallback mock data if token is missing or API fails
  const mockData = {
    publicRepos: 12,
    followers: 5,
    totalContributions: 450,
    longestStreak: 24,
    contributionGraph: generateMockContributions()
  };

  if (!token) {
    console.warn('GITHUB_TOKEN not found, returning mock data');
    return NextResponse.json(mockData);
  }

  try {
    // 1. Get User Stats (Public Repos, Followers)
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!userRes.ok) {
      console.error('User api failed');
      return NextResponse.json(mockData);
    }
    const userData = await userRes.json();

    // 2. Get Contributions (Graph + Streak)
    const to = new Date().toISOString();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);
    from.setHours(0, 0, 0, 0);

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const graphRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { login: username, from: from.toISOString(), to }
      })
    });

    if (!graphRes.ok) {
      const errorText = await graphRes.text();
      console.error('❌ GraphQL API failed:', graphRes.status, errorText);
      return NextResponse.json(mockData);
    }

    const graphData = await graphRes.json() as GitHubGraphResponse;

    if (graphData.errors) {
      console.error('❌ GraphQL ERRORS:', JSON.stringify(graphData.errors, null, 2));
      return NextResponse.json(mockData);
    }

    const weeks = graphData.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];


    let totalContributions = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];

    const contributionGraph = weeks.map((week: GitHubContributionWeek) =>
      week.contributionDays.map((day: GitHubContributionDay) => {
        const count = day.contributionCount;
        
        // Add to total
        totalContributions += count;
        
        // Calculate streak
        if (day.date <= today) {
          if (count > 0) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        
        // Return level for UI coloring
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 10) return 3;
        return 4;
      })
    );

    return NextResponse.json({
      publicRepos: userData.public_repos,
      followers: userData.followers,
      totalContributions,
      longestStreak,
      contributionGraph
    });

  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(mockData);
  }
}

// Fallback mock data generator
function generateMockContributions() {
  const weeks = 52;
  const days = 7;
  const out: number[][] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = rand();
      const level = r > 0.78 ? 4 : r > 0.6 ? 3 : r > 0.42 ? 2 : r > 0.25 ? 1 : 0;
      col.push(level);
    }
    out.push(col);
  }
  return out;
}