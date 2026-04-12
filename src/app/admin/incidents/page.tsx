import { listIncidents } from '@/lib/commandCenterStore';

export default async function AdminIncidentsPage() {
  const incidents = await listIncidents('tenant-default');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Incident Response Command</h2>
      <p className="text-sm text-slate-400 mb-6">Severity-ranked incident queue with SLA linkage and lifecycle tracking.</p>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <article key={incident.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">{incident.title}</h3>
                <p className="text-xs text-slate-400">
                  {incident.id} | {incident.severity.toUpperCase()} | Team: {incident.assignedTeamId ?? 'unassigned'}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-cyan-300">{incident.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
