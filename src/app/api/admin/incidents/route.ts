import { NextResponse } from 'next/server';
import { emitAuditEvent } from '@/lib/eventBackbone';
import { listIncidents, updateIncidentStatus } from '@/lib/commandCenterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const incidents = await listIncidents(context.tenantId);
  return NextResponse.json({ incidents });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    status?: 'open' | 'contained' | 'resolved' | 'postmortem';
  };

  if (!body.id || !body.status) {
    return NextResponse.json({ message: 'Missing id or status' }, { status: 400 });
  }

  const incident = await updateIncidentStatus(context.tenantId, body.id, body.status);
  if (!incident) {
    return NextResponse.json({ message: 'Incident not found' }, { status: 404 });
  }

  await emitAuditEvent({
    tenantId: context.tenantId,
    actorId: context.actorId,
    requestId: context.requestId,
    eventName: 'incident.updated.v1',
    entityType: 'incident',
    entityId: incident.id,
    payload: {
      status: incident.status,
      severity: incident.severity,
      assignedTeamId: incident.assignedTeamId,
    },
  });

  return NextResponse.json({ incident });
}
