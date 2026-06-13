import { NextResponse } from 'next/server';
import { getGithubStats } from '@/app/lib/fetchCodingStats'; // Adjust path

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  
  if (!username) {
    return NextResponse.json({ error: 'Username not configured' }, { status: 500 });
  }

  const stats = await getGithubStats(username);
  
  if (!stats) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  return NextResponse.json(stats);
}