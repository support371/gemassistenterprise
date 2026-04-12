import { NextResponse } from 'next/server';
import { emitAuditEvent } from '@/lib/eventBackbone';
import { listSubscribers, upsertSubscriber } from '@/lib/newsletterStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';

export async function POST(request: Request) {
  try {
    const context = getRequestContextFromRequest(request);
    const { email } = await request.json();

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const subscriber = await upsertSubscriber(context.tenantId, email);
    await emitAuditEvent({
      tenantId: context.tenantId,
      actorId: context.actorId,
      requestId: context.requestId,
      eventName: 'newsletter.subscription_created.v1',
      entityType: 'newsletter_subscriber',
      entityId: subscriber.id,
      payload: {
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const context = getRequestContextFromRequest(request);
  const subscribers = await listSubscribers(context.tenantId);
  return NextResponse.json({ subscribers });
}
