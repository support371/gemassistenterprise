import { NextResponse } from 'next/server';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';
import { emitAuditEvent } from '@/lib/eventBackbone';
import { listCampaigns, scheduleCampaign } from '@/lib/newsletterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const campaigns = await listCampaigns(context.tenantId);
  return NextResponse.json({ campaigns });
}

export async function POST(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const body = (await request.json().catch(() => ({}))) as {
    subject?: string;
    scheduledFor?: string;
  };

  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const scheduledFor = typeof body.scheduledFor === 'string' ? body.scheduledFor : '';
  if (!subject || !scheduledFor) {
    return NextResponse.json({ message: 'Missing subject or scheduledFor' }, { status: 400 });
  }

  const campaign = await scheduleCampaign(context.tenantId, subject, scheduledFor);
  await emitAuditEvent({
    tenantId: context.tenantId,
    actorId: context.actorId,
    requestId: context.requestId,
    eventName: 'newsletter.campaign_dispatched.v1',
    entityType: 'newsletter_campaign',
    entityId: campaign.id,
    payload: {
      subject: campaign.subject,
      scheduledFor: campaign.scheduledFor,
      status: campaign.status,
    },
  });

  return NextResponse.json({ campaign }, { status: 201 });
}
