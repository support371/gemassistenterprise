import { listSlaBreaches, listSlaProfiles } from '@/lib/commandCenterStore';

export default async function AdminSlaPage() {
  const [profiles, breaches] = await Promise.all([
    listSlaProfiles('tenant-default'),
    listSlaBreaches('tenant-default'),
  ]);

  return (
    <section className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">SLA Profiles</h2>
        <p className="text-sm text-slate-400 mb-6">Response and containment objectives by tenant policy.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <article key={profile.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-xs text-slate-400 mt-2">
                Ack: {profile.acknowledgeMinutes}m | Contain: {profile.containMinutes}m | Resolve: {profile.resolveMinutes}m
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">Breach Register</h2>
        <p className="text-sm text-slate-400 mb-6">Detected SLA breaches for compliance and governance workflows.</p>
        <ul className="space-y-3">
          {breaches.map((breach) => (
            <li key={breach.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>{breach.id} | Incident: {breach.incidentId}</span>
                <span className="text-xs px-2 py-1 rounded bg-amber-900/50 text-amber-300">{breach.breachType}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
