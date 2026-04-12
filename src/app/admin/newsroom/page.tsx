import { listCampaigns, listSubscribers } from '@/lib/newsletterStore';

export default async function AdminNewsroomPage() {
  const [subscribers, campaigns] = await Promise.all([
    listSubscribers('tenant-default'),
    listCampaigns('tenant-default'),
  ]);

  return (
    <section className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">Newsroom & Newsletter</h2>
        <p className="text-sm text-slate-400 mb-6">Subscriber base and campaign queue for intelligence publishing operations.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">Subscribers</h3>
            <p className="text-2xl font-semibold">{subscribers.length}</p>
          </article>
          <article className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">Campaigns</h3>
            <p className="text-2xl font-semibold">{campaigns.length}</p>
          </article>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Scheduled Campaigns</h3>
        <div className="space-y-3">
          {campaigns.length === 0 && <p className="text-sm text-slate-400">No campaigns scheduled.</p>}
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p>{campaign.subject}</p>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-cyan-300">{campaign.status}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">{new Date(campaign.scheduledFor).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
