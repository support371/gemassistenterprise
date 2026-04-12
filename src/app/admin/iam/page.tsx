import { listOrganizations, listRoleGrants, listTeams } from '@/lib/iamStore';

export default async function AdminIamPage() {
  const [teams, organizations, grants] = await Promise.all([
    listTeams('tenant-default'),
    listOrganizations('tenant-default'),
    listRoleGrants('tenant-default'),
  ]);

  return (
    <section className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">IAM Overview</h2>
        <p className="text-sm text-slate-400 mb-6">Tenant-scoped identities, organizations, teams, and permission grants.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">Organizations</h3>
            <p className="text-2xl font-semibold">{organizations.length}</p>
          </article>
          <article className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">Teams</h3>
            <p className="text-2xl font-semibold">{teams.length}</p>
          </article>
          <article className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">Role Grants</h3>
            <p className="text-2xl font-semibold">{grants.length}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
