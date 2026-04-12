import type { Organization, RoleGrant, Team } from './contracts';

const now = new Date().toISOString();
const tenantId = 'tenant-default';

const teams: Team[] = [
  {
    id: 'T-01',
    tenantId,
    name: 'Security Operations',
    leadUserId: 'user-soc-lead',
    members: 12,
    roleProfile: 'soc_analyst',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'T-02',
    tenantId,
    name: 'Incident Response',
    leadUserId: 'user-ir-lead',
    members: 7,
    roleProfile: 'incident_commander',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'T-03',
    tenantId,
    name: 'Compliance & Audit',
    leadUserId: 'user-compliance-lead',
    members: 5,
    roleProfile: 'compliance_admin',
    createdAt: now,
    updatedAt: now,
  },
];

const organizations: Organization[] = [
  {
    id: 'ORG-100',
    tenantId,
    name: 'Vertex Finance',
    domain: 'vertex.example',
    billingEnabled: true,
    tier: 'Enterprise',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ORG-233',
    tenantId,
    name: 'Northwind Health',
    domain: 'northwind.example',
    billingEnabled: false,
    tier: 'Pilot',
    createdAt: now,
    updatedAt: now,
  },
];

const grants: RoleGrant[] = [
  {
    id: 'GRANT-1',
    tenantId,
    roleId: 'role-platform-admin',
    permissionId: 'org.manage',
    scope: '*',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'GRANT-2',
    tenantId,
    roleId: 'role-soc-analyst',
    permissionId: 'alerts.read',
    scope: 'org:{id}',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'GRANT-3',
    tenantId,
    roleId: 'role-soc-analyst',
    permissionId: 'inbox.triage',
    scope: 'org:{id}',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'GRANT-4',
    tenantId,
    roleId: 'role-compliance-lead',
    permissionId: 'audit.export',
    scope: 'org:{id}',
    createdAt: now,
    updatedAt: now,
  },
];

export async function listTeams(tenant: string): Promise<Team[]> {
  return teams.filter((team) => team.tenantId === tenant);
}

export async function listOrganizations(tenant: string): Promise<Organization[]> {
  return organizations.filter((org) => org.tenantId === tenant);
}

export async function listRoleGrants(tenant: string): Promise<RoleGrant[]> {
  return grants.filter((grant) => grant.tenantId === tenant);
}
