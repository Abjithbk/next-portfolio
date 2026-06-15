import axios from 'axios';


interface SubmissionStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

export async function getGithubStats(username: string) {
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    });

    const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    });

    return {
      publicRepos: userResponse.data.public_repos || 0,
      followers: userResponse.data.followers || 0,
      // ✅ Replaced 'any' with 'GitHubRepo'
      totalStars: repoResponse.data.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0),
    };
  } catch (err) {
    console.error('Github error:', err);
    return null;
  }
}

export async function getLeetCodeStats(username: string) {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
          }
        }
      }
    `;

    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query,
        variables: { username },
        operationName: 'getUserProfile',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const matchedUser = response.data.data?.matchedUser;
    
    if (!matchedUser) {
      console.error('User not found on LeetCode');
      return null;
    }

    // ✅ Replaced 'any' with 'SubmissionStat'
    const stats: SubmissionStat[] = matchedUser.submitStats.acSubmissionNum;
    
    return {
      totalSolved: stats.find((s: SubmissionStat) => s.difficulty === 'All')?.count || 0,
      easy: stats.find((s: SubmissionStat) => s.difficulty === 'Easy')?.count || 0,
      medium: stats.find((s: SubmissionStat) => s.difficulty === 'Medium')?.count || 0,
      hard: stats.find((s: SubmissionStat) => s.difficulty === 'Hard')?.count || 0,
      ranking: matchedUser.profile?.ranking || 0,
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
}