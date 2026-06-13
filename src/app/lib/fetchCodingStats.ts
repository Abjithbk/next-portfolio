import axios from 'axios';

export async function getGithubStats(username: string) {
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    // const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
    //   headers: {
    //     'Accept': 'application/vnd.github.v3+json',
    //   },
    // });
    const commitResponse = await axios.get(
      `https://api.github.com/search/commits?q=author:${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.cloak-preview+json' 
        }
      }
    );

    return {
      publicRepos: userResponse.data.public_repos || 0,
      followers: userResponse.data.followers || 0,
      totalCommits: commitResponse.data.total_count || 0,
    };
  } catch (err) {
    console.error('GitHub error:', err);
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

    const stats = matchedUser.submitStats.acSubmissionNum;
    
    return {
      totalSolved: stats.find((s: any) => s.difficulty === 'All')?.count || 0,
      easy: stats.find((s: any) => s.difficulty === 'Easy')?.count || 0,
      medium: stats.find((s: any) => s.difficulty === 'Medium')?.count || 0,
      hard: stats.find((s: any) => s.difficulty === 'Hard')?.count || 0,
      ranking: matchedUser.profile?.ranking || 0,
    };
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
}