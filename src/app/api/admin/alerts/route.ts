import { NextResponse } from 'next/server';
import { emitAuditEvent } from '@/lib/eventBackbone';
import { listAlerts, updateAlertStatus } from '@/lib/commandCenterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const alerts = await listAlerts(context.tenantId);
  return NextResponse.json({ alerts });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    status?: 'new' | 'investigating' | 'mitigated';
  };

  if (!body.id || !body.status) {
    return NextResponse.json({ message: 'Missing id or status' }, { status: 400 });
  }

  const alert = await updateAlertStatus(context.tenantId, body.id, body.status);
  if (!alert) {
    return NextResponse.json({ message: 'Alert not found' }, { status: 404 });
  }

  await emitAuditEvent({
    tenantId: context.tenantId,
    actorId: context.actorId,
    requestId: context.requestId,
    eventName: body.status === 'mitigated' ? 'alert.escalated.v1' : 'alert.created.v1',
    entityType: 'alert',
    entityId: alert.id,
    payload: {
      status: alert.status,
      severity: alert.severity,
    },
  });

  return NextResponse.json({ alert });
}
