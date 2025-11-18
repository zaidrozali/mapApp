import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Briefcase, Activity } from "lucide-react";
import heroImage from "@assets/generated_images/KLCC_Petronas_Towers_sunset_panorama_a0b2e9f2.png";

export default function Hero() {
  const stats = [
    { icon: MapPin, label: "States", value: "13" },
    { icon: Briefcase, label: "Projects", value: "156" },
    { icon: Activity, label: "Active", value: "87" },
  ];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Malaysian State Projects Directory
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Explore development initiatives across Malaysia. Track infrastructure, social programs, and economic projects by state.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            variant="default"
            className="bg-primary hover:bg-primary text-primary-foreground border border-primary-border backdrop-blur-sm"
            data-testid="button-explore-projects"
            onClick={() => console.log("Explore projects clicked")}
          >
            Explore Projects by State
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background/10 backdrop-blur-md border-white/30 text-white hover:bg-background/20"
            data-testid="button-view-map"
            onClick={() => console.log("View map clicked")}
          >
            View Interactive Map
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-white" data-testid={`stat-${stat.label.toLowerCase()}`}>
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
