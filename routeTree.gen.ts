import { Video, MessageCircle, Send, Database, Mail, Tag, ChevronRight } from "lucide-react";

const flow = [
  { label: "Content", icon: Video },
  { label: "Engagement", icon: MessageCircle },
  { label: "DM", icon: Send },
  { label: "Lead Capture", icon: Database },
  { label: "Email Follow-Up", icon: Mail },
  { label: "Offer", icon: Tag },
];

export function SystemMap() {
  return (
    <div className="glass-card border-glow rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {flow.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3 md:gap-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center relative transition-all group-hover:border-primary/50 group-hover:shadow-glow">
                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                <step.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <span className="text-xs md:text-sm font-medium text-center max-w-[90px]">{step.label}</span>
            </div>
            {i < flow.length - 1 && (
              <ChevronRight className="h-5 w-5 text-primary/60 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
