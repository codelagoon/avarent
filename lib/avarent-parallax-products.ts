import type { ParallaxPanelVariant } from "@/components/ui/parallax-panel-visual";

export interface AvarentParallaxProduct {
  title: string;
  subtitle: string;
  variant: ParallaxPanelVariant;
}

export const avarentParallaxProducts: AvarentParallaxProduct[] = [
  {
    title: "Overview",
    subtitle: "What needs attention now",
    variant: "overview",
  },
  {
    title: "Active Findings",
    subtitle: "Open compliance issues",
    variant: "findings",
  },
  {
    title: "Monitoring Center",
    subtitle: "Severity breakdown",
    variant: "monitoring",
  },
  {
    title: "Disparity Trend",
    subtitle: "30-day approval-rate drift",
    variant: "disparity",
  },
  {
    title: "Exam Readiness",
    subtitle: "Readiness score snapshot",
    variant: "readiness",
  },
  {
    title: "AIR Analysis",
    subtitle: "Adverse Impact Ratio",
    variant: "air",
  },
  {
    title: "Proxy Detection",
    subtitle: "Variable risk flagging",
    variant: "proxy",
  },
  {
    title: "Adverse Action",
    subtitle: "Reg B reason validation",
    variant: "adverse-action",
  },
  {
    title: "Cohort Analysis",
    subtitle: "Segment approval rates",
    variant: "cohort",
  },
  {
    title: "Drift Monitor",
    subtitle: "Disparity without an alert",
    variant: "drift",
  },
  {
    title: "Evidence Packet",
    subtitle: "Prebuilt exam package",
    variant: "evidence",
  },
  {
    title: "Investigations",
    subtitle: "Open case queue",
    variant: "investigations",
  },
  {
    title: "Fair Lending Report",
    subtitle: "Structured documentation",
    variant: "report",
  },
  {
    title: "Recent Activity",
    subtitle: "Decision event log",
    variant: "activity",
  },
  {
    title: "Signal Feed",
    subtitle: "Monitoring signals",
    variant: "signals",
  },
];
