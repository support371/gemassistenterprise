import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { AuditEvent, DomainEventName } from './contracts';

const auditPath = path.join(process.cwd(), 'data', 'audit-events.ndjson');

export interface AuditFilters {
  tenantId?: string;
  eventName?: DomainEventName;
  entityType?: string;
  entityId?: string;
  limit?: number;
}

export interface EmitAuditInput {
  tenantId: string;
  actorId: string;
  eventName: DomainEventName;
  entityType: string;
  entityId: string;
  payload: Record<string, unknown>;
  requestId?: string;
}

async function ensureAuditStore(): Promise<void> {
  await fs.mkdir(path.dirname(auditPath), { recursive: true });
  try {
    await fs.access(auditPath);
  } catch {
    await fs.writeFile(auditPath, '', 'utf8');
  }
}

function parseLine(line: string): AuditEvent | null {
  if (!line.trim()) {
    return null;
  }
  try {
    return JSON.parse(line) as AuditEvent;
  } catch {
    return null;
  }
}

export async function emitAuditEvent(input: EmitAuditInput): Promise<AuditEvent> {
  await ensureAuditStore();
  const event: AuditEvent = {
    id: crypto.randomUUID(),
    tenantId: input.tenantId,
    actorId: input.actorId,
    eventName: input.eventName,
    occurredAt: new Date().toISOString(),
    entityType: input.entityType,
    entityId: input.entityId,
    payload: input.payload,
    requestId: input.requestId,
  };

  await fs.appendFile(auditPath, `${JSON.stringify(event)}\n`, 'utf8');
  return event;
}

export async function listAuditEvents(filters: AuditFilters = {}): Promise<AuditEvent[]> {
  await ensureAuditStore();
  const raw = await fs.readFile(auditPath, 'utf8');
  const rows = raw
    .split('\n')
    .map(parseLine)
    .filter((row: AuditEvent | null): row is AuditEvent => row !== null);

  const filtered = rows.filter((row: AuditEvent) => {
    if (filters.tenantId && row.tenantId !== filters.tenantId) {
      return false;
    }
    if (filters.eventName && row.eventName !== filters.eventName) {
      return false;
    }
    if (filters.entityType && row.entityType !== filters.entityType) {
      return false;
    }
    if (filters.entityId && row.entityId !== filters.entityId) {
      return false;
    }
    return true;
  });

  const sorted = filtered.sort(
    (a: AuditEvent, b: AuditEvent) => b.occurredAt.localeCompare(a.occurredAt),
  );
  if (!filters.limit || filters.limit <= 0) {
    return sorted;
  }
  return sorted.slice(0, filters.limit);
}
