import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  Shield 
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Auto-Generated Calendars",
    description: "Content dates are automatically distributed across the month based on your requirements."
  },
  {
    icon: Users,
    title: "Role-Based Workflows",
    description: "From copywriters to designers — each role has dedicated dashboards and permissions."
  },
  {
    icon: CheckCircle2,
    title: "Approval Pipeline",
    description: "Multi-stage approval process with mandatory feedback on rejections."
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Automatic time tracking per task, per role, per project for complete accountability."
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Real-time progress tracking with visual dashboards for clients and admins."
  },
  {
    icon: Shield,
    title: "Client Transparency",
    description: "Clients can view scheduled content, track progress, and approve final designs."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-gold">Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for digital marketing agencies managing Instagram content at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              variant="glass-hover"
              className="p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
