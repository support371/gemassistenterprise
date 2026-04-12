import { NextResponse } from 'next/server';
import { listOnCallSchedules } from '@/lib/commandCenterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const schedules = await listOnCallSchedules(context.tenantId);
  return NextResponse.json({ schedules });
}
