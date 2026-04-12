import HeroSection from "@/components/marketing/HeroSection";
import StatsBar from "@/components/marketing/StatsBar";
import FeatureGrid from "@/components/marketing/FeatureGrid";

export default function HomePage() {
  return (
    <div className="space-y-14">
      <HeroSection />
      <StatsBar />
      <FeatureGrid />
    </div>
  );
}
