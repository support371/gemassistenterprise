import { NextResponse } from 'next/server';
import { listContactMessages, toCsv, updateContactMessage } from '@/lib/contactMessages';
import { emitAuditEvent } from '@/lib/eventBackbone';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || undefined;
  const q = url.searchParams.get('q') || undefined;
  const format = url.searchParams.get('format');

  const messages = await listContactMessages({
    tenantId: context.tenantId,
    q,
    status: status === 'open' || status === 'triaged' || status === 'closed' ? status : undefined,
  });

  if (format === 'csv') {
    const csv = toCsv(messages);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="admin-inbox.csv"',
      },
    });
  }

  return NextResponse.json({ messages });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    status?: 'open' | 'triaged' | 'closed';
    assignedToUserId?: string | null;
    tags?: string[];
  };

  if (!body.id) {
    return NextResponse.json({ message: 'Missing message id' }, { status: 400 });
  }

  const updated = await updateContactMessage(body.id, {
    status: body.status,
    assignedToUserId: body.assignedToUserId ?? null,
    tags: body.tags,
  });

  if (!updated) {
    return NextResponse.json({ message: 'Message not found' }, { status: 404 });
  }

  if (updated.tenantId !== context.tenantId) {
    return NextResponse.json({ message: 'Message tenant mismatch' }, { status: 403 });
  }

  await emitAuditEvent({
    tenantId: context.tenantId,
    actorId: context.actorId,
    requestId: context.requestId,
    eventName: 'contact.message_updated.v1',
    entityType: 'contact_message',
    entityId: updated.id,
    payload: {
      status: updated.status,
      assignedToUserId: updated.assignedToUserId,
      tags: updated.tags,
    },
  });

  return NextResponse.json({ message: updated });
}
