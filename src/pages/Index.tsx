import CrisisBanner from "@/components/CrisisBanner";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import ResourcesSection from "@/components/ResourcesSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <CrisisBanner />
      <HeroSection />
      <ToolsSection />
      <ResourcesSection />
    </main>
  );
};

export default Index;
