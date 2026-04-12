import { NextResponse } from 'next/server';

// Analytics endpoint matching the original Code Companion tracking spec:
// POST /app-logs/{appId}/log-user-in-app/{pageName}
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ appId: string; pageName: string }> }
) {
  const { appId, pageName } = await params;
  // In production, forward to your analytics backend or write to a store
  console.log(`[analytics] app=${appId} page=${pageName} ts=${new Date().toISOString()}`);
  return NextResponse.json({ ok: true });
}
