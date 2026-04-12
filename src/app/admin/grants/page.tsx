import { listRoleGrants } from '@/lib/iamStore';

const roleNameById: Record<string, string> = {
  'role-platform-admin': 'Platform Admin',
  'role-soc-analyst': 'SOC Analyst',
  'role-compliance-lead': 'Compliance Lead',
};

export default async function GrantsAdminPage() {
  const grants = await listRoleGrants('tenant-default');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">RBAC Grants</h2>
      <p className="text-sm text-slate-400 mb-6">Role to permission mapping with explicit scopes.</p>
      <ul className="space-y-3">
        {grants.map((grant) => (
          <li key={grant.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="font-medium text-cyan-300">{roleNameById[grant.roleId] ?? grant.roleId}</span>
              <span className="text-slate-400">-&gt;</span>
              <span>{grant.permissionId}</span>
              <span className="text-slate-500">[{grant.scope}]</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
