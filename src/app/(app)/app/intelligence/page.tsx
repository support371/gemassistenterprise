import CategoryFilter from "@/components/intelligence/CategoryFilter";
import KpiCard from "@/components/intelligence/KpiCard";
import StoryCard from "@/components/intelligence/StoryCard";
import { stories } from "@/data/intelligence/stories";
import { dashboardKpis } from "@/data/kpis/dashboard-kpis";

export default function IntelligencePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Command Center Intelligence</h1>
        <p className="text-slate-300">Live cyber and physical threat activity across sectors.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>
      <CategoryFilter categories={["All", "Cyber", "Fraud", "Critical Infrastructure"]} />
      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            title={story.title}
            category={story.category}
            summary={story.summary}
            timestamp={story.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
