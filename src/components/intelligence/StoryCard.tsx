type StoryCardProps = {
  title: string;
  category: string;
  summary: string;
  timestamp: string;
};

export default function StoryCard({ title, category, summary, timestamp }: StoryCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-wider text-cyan-400">{category}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{summary}</p>
      <p className="mt-4 text-xs text-slate-500">{timestamp}</p>
    </article>
  );
}
