"use client";

import { DashboardMockup } from "@/components/ui/dashboard-mockup";
import { ScaledMockup } from "@/components/ui/scaled-mockup";

export function SolutionDashboard() {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A0A0A] shadow-2xl">
      <ScaledMockup designWidth={1100} designHeight={700} className="w-full">
        <DashboardMockup />
      </ScaledMockup>
    </div>
  );
}
