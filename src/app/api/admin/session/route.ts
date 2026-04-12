import { NextResponse } from 'next/server';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  const context = getRequestContextFromRequest(request);
  const authenticated = isAdminAuthenticatedRequest(request);
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    tenantId: context.tenantId,
    actorId: context.actorId,
    requestId: context.requestId,
  });
}
