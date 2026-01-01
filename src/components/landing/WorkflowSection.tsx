import { ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Client Brief",
    description: "Client submits content requirements and goals",
    role: "Client"
  },
  {
    number: "02",
    title: "Content Planning",
    description: "Digital Marketing Manager sets up content calendar",
    role: "DM Manager"
  },
  {
    number: "03",
    title: "Copywriting",
    description: "Copywriter creates compelling content copy",
    role: "Copywriter"
  },
  {
    number: "04",
    title: "Copy Review",
    description: "Copy QC reviews and approves the content",
    role: "Copy QC"
  },
  {
    number: "05",
    title: "Design",
    description: "Designer creates the visual content",
    role: "Designer"
  },
  {
    number: "06",
    title: "Design Review",
    description: "Design QC reviews and approves the design",
    role: "Design QC"
  },
  {
    number: "07",
    title: "Final Approval",
    description: "Admin and client approve for publishing",
    role: "Admin & Client"
  }
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-24 relative overflow-hidden">
      <div className="orb orb-2" style={{ top: '20%', left: '-10%' }} />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Streamlined{" "}
            <span className="text-gradient-gold">Workflow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven 7-step process that ensures quality at every stage.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative group"
              >
                {/* Card */}
                <div className="glass-card-hover p-5 text-center h-full">
                  {/* Step Number */}
                  <div className="text-3xl font-bold text-gradient-gold mb-3">
                    {step.number}
                  </div>
                  
                  {/* Role Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {step.role}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  
                  {/* Check Icon on Hover */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
