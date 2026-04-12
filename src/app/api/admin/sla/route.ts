import { NextResponse } from 'next/server';
import { listSlaBreaches, listSlaProfiles } from '@/lib/commandCenterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const [profiles, breaches] = await Promise.all([
    listSlaProfiles(context.tenantId),
    listSlaBreaches(context.tenantId),
  ]);

  return NextResponse.json({
    profiles,
    breaches,
  });
}
