import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Alert, Incident, OnCallSchedule, SlaBreach, SlaProfile } from './contracts';

interface CommandCenterSnapshot {
  alerts: Alert[];
  incidents: Incident[];
  slaProfiles: SlaProfile[];
  slaBreaches: SlaBreach[];
  onCallSchedules: OnCallSchedule[];
}

const storePath = path.join(process.cwd(), 'data', 'command-center.json');

const defaultTenant = 'tenant-default';
const now = new Date().toISOString();

const defaultSnapshot: CommandCenterSnapshot = {
  alerts: [
    {
      id: 'ALERT-1001',
      tenantId: defaultTenant,
      title: 'Suspicious privilege escalation pattern',
      severity: 'high',
      status: 'investigating',
      source: 'EDR',
      indicator: 'hash:9e4d...',
      incidentId: 'INC-9001',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'ALERT-1002',
      tenantId: defaultTenant,
      title: 'Unusual outbound transfer spike',
      severity: 'critical',
      status: 'new',
      source: 'SIEM',
      indicator: 'ip:185.44.x.x',
      incidentId: null,
      createdAt: now,
      updatedAt: now,
    },
  ],
  incidents: [
    {
      id: 'INC-9001',
      tenantId: defaultTenant,
      title: 'Potential credential compromise',
      severity: 'sev2',
      status: 'contained',
      detectedAt: now,
      assignedTeamId: 'T-01',
      slaProfileId: 'SLA-STD',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'INC-9002',
      tenantId: defaultTenant,
      title: 'Cloud policy drift in production',
      severity: 'sev3',
      status: 'open',
      detectedAt: now,
      assignedTeamId: 'T-03',
      slaProfileId: 'SLA-STD',
      createdAt: now,
      updatedAt: now,
    },
  ],
  slaProfiles: [
    {
      id: 'SLA-STD',
      tenantId: defaultTenant,
      name: 'Enterprise Standard',
      acknowledgeMinutes: 5,
      containMinutes: 30,
      resolveMinutes: 240,
      createdAt: now,
      updatedAt: now,
    },
  ],
  slaBreaches: [
    {
      id: 'BREACH-101',
      tenantId: defaultTenant,
      incidentId: 'INC-9002',
      breachType: 'ack',
      breachedAt: now,
      createdAt: now,
      updatedAt: now,
    },
  ],
  onCallSchedules: [
    {
      id: 'ONCALL-1',
      tenantId: defaultTenant,
      teamId: 'T-02',
      policyId: 'ESC-PRIMARY',
      activeUserId: 'user-ir-primary',
      startsAt: now,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
      createdAt: now,
      updatedAt: now,
    },
  ],
};

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(defaultSnapshot, null, 2), 'utf8');
  }
}

async function readStore(): Promise<CommandCenterSnapshot> {
  await ensureStore();
  const raw = await fs.readFile(storePath, 'utf8');
  try {
    const parsed = JSON.parse(raw) as CommandCenterSnapshot;
    return {
      alerts: parsed.alerts ?? [],
      incidents: parsed.incidents ?? [],
      slaProfiles: parsed.slaProfiles ?? [],
      slaBreaches: parsed.slaBreaches ?? [],
      onCallSchedules: parsed.onCallSchedules ?? [],
    };
  } catch {
    return defaultSnapshot;
  }
}

async function writeStore(snapshot: CommandCenterSnapshot): Promise<void> {
  await fs.writeFile(storePath, JSON.stringify(snapshot, null, 2), 'utf8');
}

export async function listAlerts(tenantId: string): Promise<Alert[]> {
  const store = await readStore();
  return store.alerts.filter((alert) => alert.tenantId === tenantId);
}

export async function listIncidents(tenantId: string): Promise<Incident[]> {
  const store = await readStore();
  return store.incidents.filter((incident) => incident.tenantId === tenantId);
}

export async function listSlaProfiles(tenantId: string): Promise<SlaProfile[]> {
  const store = await readStore();
  return store.slaProfiles.filter((profile) => profile.tenantId === tenantId);
}

export async function listSlaBreaches(tenantId: string): Promise<SlaBreach[]> {
  const store = await readStore();
  return store.slaBreaches.filter((breach) => breach.tenantId === tenantId);
}

export async function listOnCallSchedules(tenantId: string): Promise<OnCallSchedule[]> {
  const store = await readStore();
  return store.onCallSchedules.filter((schedule) => schedule.tenantId === tenantId);
}

export async function updateIncidentStatus(
  tenantId: string,
  incidentId: string,
  status: Incident['status'],
): Promise<Incident | null> {
  const store = await readStore();
  const index = store.incidents.findIndex((incident) => incident.id === incidentId && incident.tenantId === tenantId);
  if (index === -1) {
    return null;
  }
  const current = store.incidents[index];
  store.incidents[index] = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
  return store.incidents[index];
}

export async function updateAlertStatus(
  tenantId: string,
  alertId: string,
  status: Alert['status'],
): Promise<Alert | null> {
  const store = await readStore();
  const index = store.alerts.findIndex((alert) => alert.id === alertId && alert.tenantId === tenantId);
  if (index === -1) {
    return null;
  }
  const current = store.alerts[index];
  store.alerts[index] = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
  return store.alerts[index];
}
