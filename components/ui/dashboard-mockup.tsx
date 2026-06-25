"use client";

import {
  LayoutGrid,
  Search,
  BarChart3,
  FileText,
  Activity,
  MoreHorizontal,
  Database,
  Clock,
  Users,
  Settings,
  Bell,
  Info,
  ChevronDown,
  FileCheck,
  ScanSearch,
  Check,
  SearchIcon,
} from "lucide-react";

const DESIGN_WIDTH = 1100;
const DESIGN_HEIGHT = 700;

const navItems = [
  { icon: LayoutGrid, active: true },
  { icon: Search, badge: 3 },
  { icon: BarChart3 },
  { icon: FileText },
  { icon: Activity, badge: 3 },
  { icon: MoreHorizontal },
  { icon: Database },
  { icon: Clock },
  { icon: Users },
  { icon: Settings },
];

const attentionCards = [
  {
    label: "Critical findings",
    value: "2",
    valueClass: "text-red-400",
    sub: "1 active threats",
  },
  {
    label: "Top breach metric",
    subLabel: "Approval Rate Disparity (Adverse Impact Ratio)",
    value: "1.00",
    valueSuffix: "— within threshold",
    valueClass: "text-red-400",
    sub: "Hispanic / Latino — Mortgage",
  },
  {
    label: "Exam readiness",
    value: "70%",
    sub: "Strong",
    subExtra: "↓ degrading",
    subExtraClass: "text-red-400",
  },
  {
    label: "Investigations",
    value: "3",
    sub: "1 open · 0 in review",
    subExtra: "Avg. age: 1.0 days",
  },
  {
    label: "Models monitored",
    value: "3 / 12",
    sub: "↑ 2 new this month",
    sparkline: true,
  },
];

const activeFindings = [
  {
    id: "FN-204",
    category: "Portfolio",
    issue: "Adverse Impact Ratio Breach",
    group: "Mortgage approval rate — Hispanic / Latino",
    severity: "Critical",
    age: "1d",
    status: "Investigating",
    statusType: "investigating" as const,
  },
  {
    id: "FN-199",
    category: "Mortgage",
    issue: "Sequential Proxy Correlation ...",
    group: "Priya K. Sharma",
    severity: "Critical",
    age: "1d",
    status: "Resolved",
    statusType: "resolved" as const,
  },
  {
    id: "FN-203",
    category: "Portfolio",
    issue: "Single Proxy Variable",
    group: "DeShawn R. Brown",
    severity: "High",
    age: "1d",
    status: "Resolved",
    statusType: "resolved" as const,
  },
];

const recentActivity = [
  {
    icon: FileCheck,
    iconClass: "text-emerald-400",
    title: "Good-faith mortgage application — causal proof bundle signed",
    id: "EVT-20260429-0001",
    time: "2h ago",
  },
  {
    icon: ScanSearch,
    iconClass: "text-amber-400",
    title: "Proxy variable ZIP_CODE detected and causally severed from credit score path",
    id: "EVT-20260429-0002",
    time: "2h ago",
    badge: "Medium",
  },
];

// Y-axis: 1.05 (top) → 0.72 (bottom) mapped to viewBox 0–60
function valueToY(v: number) {
  return ((1.05 - v) / 0.33) * 60;
}

function buildLine(values: number[]) {
  return values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${valueToY(v)}`)
    .join(" ");
}

const chartLines = [
  {
    label: "Mortgage",
    color: "#f97316",
    points: buildLine([0.98, 0.95, 0.92, 0.88, 0.85, 0.82, 0.78, 0.75, 0.73, 0.72]),
  },
  {
    label: "Auto",
    color: "#fbbf24",
    points: buildLine([0.92, 0.9, 0.88, 0.9, 0.89, 0.88, 0.87, 0.88, 0.89, 0.88]),
  },
  {
    label: "Personal",
    color: "#e5e5e5",
    points: buildLine([0.98, 0.99, 0.97, 0.98, 1.0, 0.99, 0.98, 0.97, 0.98, 0.99]),
  },
  {
    label: "Card",
    color: "#60a5fa",
    points: buildLine([0.97, 0.98, 0.96, 0.97, 0.98, 0.99, 0.97, 0.98, 0.99, 0.98]),
  },
];

const thresholdLines = [
  { value: 0.95, label: "0.95 — Comfortable margin" },
  { value: 0.9, label: "0.90 — Early warning" },
  { value: 0.85, label: "0.85 — Elevated risk" },
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/20 text-red-400 border-red-500/30",
    High: "bg-amber-700/30 text-amber-400 border-amber-600/30",
    Medium: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  };
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${styles[severity] ?? styles.Medium}`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status, type }: { status: string; type: "investigating" | "resolved" }) {
  if (type === "investigating") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-amber-500/40 text-amber-400 text-[11px] font-medium whitespace-nowrap">
        <SearchIcon className="w-3 h-3 shrink-0" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-400 text-[11px] font-medium whitespace-nowrap">
      <Check className="w-3 h-3 shrink-0" />
      {status}
    </span>
  );
}

export function DashboardMockup() {
  return (
    <div
      className="bg-[#0A0A0A] text-white font-sans overflow-hidden flex text-[12px]"
      style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}
    >
      {/* Sidebar */}
      <div className="w-12 shrink-0 border-r border-white/5 flex flex-col items-center py-3 gap-1.5 bg-[#0A0A0A]">
        <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center text-[11px] font-bold text-black mb-1">
          A
        </div>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  item.active ? "bg-white/10 text-white" : "text-white/35"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
              {item.badge && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
        <div className="flex-1" />
        <div className="relative mb-2">
          <Bell className="w-4 h-4 text-white/35" strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] font-bold flex items-center justify-center">
            3
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-black shrink-0">
          SC
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Critical banner */}
        <div className="shrink-0 flex items-center justify-between px-4 py-1.5 bg-red-950/80 border-b border-red-500/20">
          <span className="text-red-300 text-[12px]">
            <span className="font-semibold">2 critical findings</span> require immediate attention.
          </span>
          <span className="text-red-300 text-[12px] font-medium shrink-0">Review now →</span>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden p-3 flex flex-col gap-2">
          {/* AIR / SPD */}
          <div className="flex gap-6 shrink-0 text-[11px] text-white/50">
            <span>
              Adverse Impact Ratio (AIR) — <span className="text-white font-semibold">1.00</span> — within
              0.80 threshold
            </span>
            <span>
              Statistical Parity Difference (SPD) — <span className="text-white font-semibold">0.00</span> —
              within 0.10 threshold
            </span>
          </div>

          {/* What needs attention */}
          <div className="shrink-0">
            <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">
              What Needs Attention Now
            </div>
            <div className="grid grid-cols-5 gap-2">
              {attentionCards.map((card) => (
                <div key={card.label} className="bg-zinc-900/80 rounded border border-white/5 p-2.5">
                  <div className="text-[10px] text-white/40 mb-0.5 leading-tight">{card.label}</div>
                  {"subLabel" in card && card.subLabel && (
                    <div className="text-[9px] text-white/30 mb-1 leading-tight">{card.subLabel}</div>
                  )}
                  <div className={`font-semibold leading-none text-[18px] ${card.valueClass ?? "text-white"}`}>
                    {card.value}
                    {"valueSuffix" in card && card.valueSuffix && (
                      <span className="text-[10px] font-normal text-white/40 ml-1">{card.valueSuffix}</span>
                    )}
                  </div>
                  <div className="text-[10px] text-white/40 mt-1">{card.sub}</div>
                  {"subExtra" in card && card.subExtra && (
                    <div className={`text-[10px] mt-0.5 ${card.subExtraClass ?? "text-white/30"}`}>
                      {card.subExtra}
                    </div>
                  )}
                  {"sparkline" in card && card.sparkline && (
                    <svg className="w-full h-5 mt-1" viewBox="0 0 60 12" preserveAspectRatio="none">
                      <polyline
                        points="0,8 10,6 20,9 30,4 40,7 50,3 60,5"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-white/30 mt-1.5">
              2 critical findings need immediate review; mortgage AIR breach is the top priority.
            </div>
          </div>

          {/* Main grid */}
          <div className="flex gap-2 flex-1 min-h-0">
            {/* Left column */}
            <div className="flex-[3] flex flex-col gap-2 min-w-0 min-h-0">
              {/* Active Findings */}
              <div className="flex-1 bg-zinc-900/80 rounded border border-white/5 p-3 min-h-0 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                      Active Findings
                    </span>
                    <Info className="w-3.5 h-3.5 text-white/25" />
                  </div>
                  <span className="text-[10px] text-amber-500">View all</span>
                </div>
                <div className="overflow-hidden min-h-0 flex-1">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="text-white/30 border-b border-white/5">
                        <th className="text-left font-medium pb-1.5 pr-2">ID</th>
                        <th className="text-left font-medium pb-1.5 pr-2">Category</th>
                        <th className="text-left font-medium pb-1.5 pr-2">Issue Description</th>
                        <th className="text-left font-medium pb-1.5 pr-2">Affected Group</th>
                        <th className="text-left font-medium pb-1.5 pr-2">Severity</th>
                        <th className="text-left font-medium pb-1.5 pr-2">Age</th>
                        <th className="text-left font-medium pb-1.5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeFindings.map((f) => (
                        <tr key={f.id} className="border-b border-white/5 last:border-0">
                          <td className="py-1.5 pr-2 text-amber-500 font-mono">{f.id}</td>
                          <td className="py-1.5 pr-2 text-white/50">{f.category}</td>
                          <td className="py-1.5 pr-2 text-white/70">{f.issue}</td>
                          <td className="py-1.5 pr-2 text-white/50">{f.group}</td>
                          <td className="py-1.5 pr-2">
                            <SeverityBadge severity={f.severity} />
                          </td>
                          <td className="py-1.5 pr-2 text-white/40">{f.age}</td>
                          <td className="py-1.5">
                            <StatusBadge status={f.status} type={f.statusType} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="shrink-0 bg-zinc-900/80 rounded border border-white/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                    Recent Activity
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/25" />
                </div>
                <div className="flex flex-col gap-2">
                  {recentActivity.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex items-start gap-2">
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.iconClass}`} strokeWidth={1.5} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] text-white/70 leading-snug">{item.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-white/30 font-mono">{item.id}</span>
                            {item.badge && <SeverityBadge severity={item.badge} />}
                            <span className="text-[10px] text-white/25">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column — Monitoring Center */}
            <div className="flex-[2] flex flex-col gap-2 min-w-0 min-h-0">
              <div className="flex-1 bg-zinc-900/80 rounded border border-white/5 p-3 flex flex-col min-h-0">
                <div className="flex items-center mb-2 shrink-0 border-b border-white/5 pb-1.5">
                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                    Monitoring Center
                  </span>
                  <div className="flex gap-3 ml-auto">
                    <span className="text-[10px] text-amber-500 border-b border-amber-500 pb-0.5">Overview</span>
                    <span className="text-[10px] text-white/30">Signals</span>
                  </div>
                </div>

                {/* Severity breakdown */}
                <div className="grid grid-cols-4 gap-1.5 mb-2 shrink-0">
                  {[
                    { label: "Critical", count: 1, color: "text-red-400 border-red-500/30 bg-red-500/10" },
                    { label: "High", count: 1, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
                    { label: "Medium", count: 0, color: "text-white/40 border-white/10 bg-white/5" },
                    { label: "Low", count: 0, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                  ].map((s) => (
                    <div key={s.label} className={`rounded border p-1.5 text-center ${s.color}`}>
                      <div className="text-[16px] font-semibold leading-none">{s.count}</div>
                      <div className="text-[9px] mt-1 opacity-70">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Disparity trend chart */}
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="text-[10px] text-white/40 mb-1 shrink-0">Disparity Trend (30 Days)</div>
                  <div className="flex flex-1 min-h-[120px] gap-1">
                    <div className="flex flex-col justify-between text-[9px] text-white/20 shrink-0 pr-1 py-0.5">
                      {["1.05", "0.95", "0.85", "0.72"].map((v) => (
                        <span key={v}>{v}</span>
                      ))}
                    </div>
                    <div className="flex-1 relative min-w-0">
                      {thresholdLines.map((t) => (
                        <div
                          key={t.value}
                          className="absolute left-0 right-0 border-t border-dashed border-white/10"
                          style={{ top: `${(valueToY(t.value) / 60) * 100}%` }}
                        />
                      ))}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                        {chartLines.map((line) => (
                          <polyline
                            key={line.label}
                            points={line.points}
                            fill="none"
                            stroke={line.color}
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] text-white/20 mt-1 px-4 shrink-0">
                    {["D1", "D8", "D15", "D22", "D29"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 shrink-0">
                    {chartLines.map((l) => (
                      <span key={l.label} className="flex items-center gap-1 text-[9px] text-white/40">
                        <span className="w-3 h-0.5 rounded shrink-0" style={{ backgroundColor: l.color }} />
                        {l.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 mt-1 shrink-0">
                    {thresholdLines.map((t) => (
                      <span key={t.value} className="text-[8px] text-white/25">
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exam Readiness Snapshot */}
              <div className="shrink-0 bg-zinc-900/80 rounded border border-white/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                    Exam Readiness Snapshot
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
