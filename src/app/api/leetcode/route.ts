import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {

    const username = 'Abjith_B_K';

    const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
    `;
    try {
        const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch Leetcode data")
    }

    const data = await res.json();

    if(data.errors) {
        return NextResponse.json({error:"user not found"},{status:404})
    }
    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const totals = data.data.allQuestionsCount;

    // Map the data to Easy, Medium, Hard
    const getStat = (difficulty: string) => stats.find((s:any) => s.difficulty === difficulty) || { count: 0, submissions: 0 };
    const getTotal = (difficulty: string) => totals.find((t:any) => t.difficulty === difficulty)?.count || 0;

    const easy = getStat('Easy');
    const medium = getStat('Medium');
    const hard = getStat('Hard');

    const totalSolved = easy.count + medium.count + hard.count;

    return NextResponse.json({
      username,
      totalSolved,
      easy: { solved: easy.count, total: getTotal('Easy'), submissions: easy.submissions },
      medium: { solved: medium.count, total: getTotal('Medium'), submissions: medium.submissions },
      hard: { solved: hard.count, total: getTotal('Hard'), submissions: hard.submissions },
    });
    }
    catch(error) {
         console.error('LeetCode API Error:', error);
         return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
    
}