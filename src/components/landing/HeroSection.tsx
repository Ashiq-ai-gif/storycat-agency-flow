import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Agency-Grade Workflow Management</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Streamline Your{" "}
            <span className="text-gradient-gold">Digital Marketing</span>{" "}
            Workflow
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            From client onboarding to final approval — manage Instagram content production 
            with automated calendars, role-based workflows, and real-time progress tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animate-delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?mode=signup">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="glass" size="xl">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up animate-delay-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">99%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-20 relative max-w-5xl mx-auto animate-fade-in-up animate-delay-400">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
          <div className="relative glass-card p-2 rounded-2xl">
            <div className="bg-card rounded-xl p-6 border border-border">
              {/* Mock Dashboard Preview */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {/* Sidebar Mock */}
                <div className="col-span-1 space-y-3">
                  <div className="h-8 bg-secondary rounded-lg" />
                  <div className="h-6 bg-secondary/60 rounded-lg w-3/4" />
                  <div className="h-6 bg-primary/20 rounded-lg border-l-2 border-primary" />
                  <div className="h-6 bg-secondary/60 rounded-lg w-4/5" />
                  <div className="h-6 bg-secondary/60 rounded-lg w-2/3" />
                </div>
                {/* Content Mock */}
                <div className="col-span-3 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-secondary rounded-lg w-48" />
                    <div className="h-10 bg-primary rounded-lg w-32" />
                  </div>
                  {/* Calendar Grid Mock */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-lg ${
                          [5, 12, 19, 26].includes(i) 
                            ? 'bg-primary/30 border border-primary/50' 
                            : 'bg-secondary/40'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
