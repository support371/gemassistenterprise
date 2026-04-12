import { NextResponse } from 'next/server';
import type { DomainEventName } from '@/lib/contracts';
import { listAuditEvents } from '@/lib/eventBackbone';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

function parseLimit(value: string | null): number {
  if (!value) {
    return 100;
  }
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 100;
  }
  return Math.min(parsed, 1000);
}

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const url = new URL(request.url);

  const eventName = url.searchParams.get('eventName') as DomainEventName | null;
  const entityType = url.searchParams.get('entityType');
  const entityId = url.searchParams.get('entityId');
  const limit = parseLimit(url.searchParams.get('limit'));

  const events = await listAuditEvents({
    tenantId: context.tenantId,
    eventName: eventName ?? undefined,
    entityType: entityType ?? undefined,
    entityId: entityId ?? undefined,
    limit,
  });

  return NextResponse.json({ events });
}
