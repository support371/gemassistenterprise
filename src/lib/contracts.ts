export type UUID = string;

export interface TenantScoped {
  tenantId: string;
}

export interface Audited {
  createdAt: string;
  updatedAt: string;
}

export interface User extends TenantScoped, Audited {
  id: UUID;
  email: string;
  displayName: string;
  status: 'active' | 'invited' | 'disabled';
}

export interface Role extends TenantScoped, Audited {
  id: UUID;
  name: string;
  description: string;
}

export interface Permission {
  id: string;
  description: string;
}

export interface RoleGrant extends TenantScoped, Audited {
  id: UUID;
  roleId: UUID;
  permissionId: string;
  scope: string;
}

export interface Session extends TenantScoped {
  id: UUID;
  userId: UUID;
  issuedAt: string;
  expiresAt: string;
}

export interface Organization extends TenantScoped, Audited {
  id: string;
  name: string;
  domain: string;
  tier: 'Pilot' | 'Enterprise' | 'Critical';
  billingEnabled: boolean;
}

export interface Team extends TenantScoped, Audited {
  id: string;
  name: string;
  leadUserId: UUID;
  roleProfile: string;
  members: number;
}

export interface ContactMessage extends TenantScoped, Audited {
  id: UUID;
  sourcePage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  messageBody: string;
  status: 'open' | 'triaged' | 'closed';
  assignedToUserId: string | null;
  orgId: string | null;
  tags: string[];
}

export interface Alert extends TenantScoped, Audited {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'mitigated';
  source: string;
  indicator: string;
  incidentId: string | null;
}

export interface Incident extends TenantScoped, Audited {
  id: string;
  title: string;
  severity: 'sev1' | 'sev2' | 'sev3' | 'sev4';
  status: 'open' | 'contained' | 'resolved' | 'postmortem';
  detectedAt: string;
  assignedTeamId: string | null;
  slaProfileId: string;
}

export interface SlaProfile extends TenantScoped, Audited {
  id: string;
  name: string;
  acknowledgeMinutes: number;
  containMinutes: number;
  resolveMinutes: number;
}

export interface SlaBreach extends TenantScoped, Audited {
  id: string;
  incidentId: string;
  breachType: 'ack' | 'contain' | 'resolve';
  breachedAt: string;
}

export interface EscalationPolicy extends TenantScoped, Audited {
  id: string;
  name: string;
  levels: number;
  ackTimeoutMinutes: number;
}

export interface OnCallSchedule extends TenantScoped, Audited {
  id: string;
  teamId: string;
  policyId: string;
  activeUserId: string;
  startsAt: string;
  endsAt: string;
}

export interface AuditEvent extends TenantScoped {
  id: string;
  eventName: DomainEventName;
  actorId: string;
  occurredAt: string;
  entityType: string;
  entityId: string;
  payload: Record<string, unknown>;
  requestId?: string;
}

export type DomainEventName =
  | 'alert.created.v1'
  | 'alert.escalated.v1'
  | 'incident.opened.v1'
  | 'incident.updated.v1'
  | 'sla.breached.v1'
  | 'oncall.page_sent.v1'
  | 'audit.event_written.v1'
  | 'newsletter.campaign_dispatched.v1'
  | 'newsletter.subscription_created.v1'
  | 'contact.message_created.v1'
  | 'contact.message_updated.v1'
  | 'iam.role_grant_updated.v1';
