import { NextResponse } from 'next/server';
import { listOrganizations, listRoleGrants, listTeams } from '@/lib/iamStore';
import { getRequestContextFromRequest } from '@/lib/tenantContext';
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth';

export async function GET(request: Request) {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const context = getRequestContextFromRequest(request);
  const [teams, organizations, grants] = await Promise.all([
    listTeams(context.tenantId),
    listOrganizations(context.tenantId),
    listRoleGrants(context.tenantId),
  ]);

  return NextResponse.json({
    teams,
    organizations,
    grants,
  });
}
