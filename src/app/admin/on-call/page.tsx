import { listOnCallSchedules } from '@/lib/commandCenterStore';

export default async function AdminOnCallPage() {
  const schedules = await listOnCallSchedules('tenant-default');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">On-Call & Escalation</h2>
      <p className="text-sm text-slate-400 mb-6">Active rotation, escalation policy binding, and handoff windows.</p>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Schedule</th>
              <th className="py-2 pr-4">Team</th>
              <th className="py-2 pr-4">Policy</th>
              <th className="py-2 pr-4">Active User</th>
              <th className="py-2 pr-4">Window</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="border-b border-slate-800/70">
                <td className="py-3 pr-4">{schedule.id}</td>
                <td className="py-3 pr-4">{schedule.teamId}</td>
                <td className="py-3 pr-4">{schedule.policyId}</td>
                <td className="py-3 pr-4">{schedule.activeUserId}</td>
                <td className="py-3 pr-4 text-xs text-slate-400">
                  {new Date(schedule.startsAt).toLocaleString()} - {new Date(schedule.endsAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
