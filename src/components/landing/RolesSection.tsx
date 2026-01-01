import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Shield, 
  Megaphone, 
  PenTool, 
  FileCheck, 
  Palette, 
  Eye 
} from "lucide-react";

const roles = [
  {
    icon: User,
    title: "Client",
    color: "from-blue-500 to-cyan-500",
    permissions: [
      "Submit project briefs",
      "View content calendar",
      "Track overall progress",
      "Approve final designs"
    ]
  },
  {
    icon: Shield,
    title: "Admin (Head)",
    color: "from-primary to-accent",
    permissions: [
      "Manage employee roles",
      "View all workflows",
      "Track employee time",
      "Final review authority"
    ]
  },
  {
    icon: Megaphone,
    title: "DM Manager",
    color: "from-purple-500 to-pink-500",
    permissions: [
      "View new projects",
      "Setup content calendar",
      "Add content details",
      "Assign to copywriters"
    ]
  },
  {
    icon: PenTool,
    title: "Copywriter",
    color: "from-orange-500 to-red-500",
    permissions: [
      "View assigned tasks",
      "Write content copy",
      "Submit for QC review",
      "Revise on feedback"
    ]
  },
  {
    icon: FileCheck,
    title: "Copy QC",
    color: "from-green-500 to-emerald-500",
    permissions: [
      "Review submitted copy",
      "Approve or reject",
      "Provide feedback",
      "Send to designer"
    ]
  },
  {
    icon: Palette,
    title: "Designer",
    color: "from-pink-500 to-rose-500",
    permissions: [
      "View approved copy",
      "Create visual designs",
      "Upload final assets",
      "Submit for QC review"
    ]
  },
  {
    icon: Eye,
    title: "Design QC",
    color: "from-indigo-500 to-violet-500",
    permissions: [
      "Review designs",
      "Approve or reject",
      "Provide feedback",
      "Send to admin"
    ]
  }
];

const RolesSection = () => {
  return (
    <section id="roles" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Role-Based{" "}
            <span className="text-gradient-gold">Access Control</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each team member gets a tailored dashboard with specific permissions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <Card 
              key={role.title}
              variant="glass-hover"
              className="overflow-hidden"
            >
              <div className={`h-1 bg-gradient-to-r ${role.color}`} />
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{role.title}</h3>
                <ul className="space-y-2">
                  {role.permissions.map((permission) => (
                    <li key={permission} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
