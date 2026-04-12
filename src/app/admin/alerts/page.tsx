import { listAlerts } from '@/lib/commandCenterStore';

export default async function AdminAlertsPage() {
  const alerts = await listAlerts('tenant-default');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Threat Monitoring Queue</h2>
      <p className="text-sm text-slate-400 mb-6">Normalized alert stream with source attribution and incident correlation.</p>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <article key={alert.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-xs text-slate-400">
                  {alert.id} | {alert.source} | {alert.indicator}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded bg-rose-900/50 text-rose-300">{alert.severity}</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-cyan-300">{alert.status}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
