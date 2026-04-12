import { listAuditEvents } from '@/lib/eventBackbone';

export default async function AdminAuditPage() {
  const events = await listAuditEvents({
    tenantId: 'tenant-default',
    limit: 200,
  });

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Audit Event Backbone</h2>
      <p className="text-sm text-slate-400 mb-6">Append-only audit ledger for sensitive operational actions.</p>

      <div className="space-y-3">
        {events.length === 0 && <p className="text-sm text-slate-400">No events found yet.</p>}
        {events.map((event) => (
          <article key={event.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">{new Date(event.occurredAt).toLocaleString()}</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-cyan-300">{event.eventName}</span>
            </div>
            <p className="text-sm mt-2">
              {event.entityType}:{event.entityId} by {event.actorId}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
