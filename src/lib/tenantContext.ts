import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE } from './adminAuth';

export interface RequestContext {
  tenantId: string;
  actorId: string;
  requestId: string;
}

function normalizeTenantId(value: string | null): string {
  if (!value) {
    return 'tenant-default';
  }
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : 'tenant-default';
}

function normalizeActorId(value: string | null | undefined): string {
  if (!value || value.trim().length === 0) {
    return 'anonymous';
  }
  return value.trim();
}

export function getRequestContextFromNextRequest(request: NextRequest): RequestContext {
  const tenantHeader = request.headers.get('x-tenant-id');
  const actorHeader = request.headers.get('x-actor-id');
  const requestIdHeader = request.headers.get('x-request-id');
  const adminCookie = request.cookies.get(ADMIN_COOKIE)?.value;

  return {
    tenantId: normalizeTenantId(tenantHeader),
    actorId: normalizeActorId(actorHeader ?? adminCookie ?? undefined),
    requestId: requestIdHeader ?? crypto.randomUUID(),
  };
}

export function getRequestContextFromRequest(request: Request): RequestContext {
  const headers = request.headers;
  return {
    tenantId: normalizeTenantId(headers.get('x-tenant-id')),
    actorId: normalizeActorId(headers.get('x-actor-id')),
    requestId: headers.get('x-request-id') ?? crypto.randomUUID(),
  };
}
