"use client";

import { DashboardMockup } from "@/components/ui/dashboard-mockup";
import { ScaledMockup } from "@/components/ui/scaled-mockup";

export function SolutionDashboard() {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[65%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-black/70 shadow-[0_32px_100px_-12px_rgba(0,0,0,0.85)] blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl">
        <ScaledMockup designWidth={1100} designHeight={700} className="w-full">
          <DashboardMockup />
        </ScaledMockup>
      </div>
    </div>
  );
}
