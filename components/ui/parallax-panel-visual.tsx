import type { ReactNode } from "react";

export type ParallaxPanelVariant =
  | "overview"
  | "findings"
  | "monitoring"
  | "disparity"
  | "readiness"
  | "air"
  | "proxy"
  | "adverse-action"
  | "cohort"
  | "drift"
  | "evidence"
  | "investigations"
  | "report"
  | "activity"
  | "signals";

interface ParallaxPanelVisualProps {
  variant: ParallaxPanelVariant;
}

/* ── chart helpers ───────────────────────────────────────── */

const DEFAULT_Y_MAX = 1.05;
const DEFAULT_Y_MIN = 0.72;

function metricToY(v: number, height = 56, yMin = DEFAULT_Y_MIN, yMax = DEFAULT_Y_MAX) {
  return ((yMax - v) / (yMax - yMin)) * height;
}

function buildPoints(values: number[], width = 200, height = 56, yMin = DEFAULT_Y_MIN, yMax = DEFAULT_Y_MAX) {
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = metricToY(v, height, yMin, yMax);
      return `${x},${y}`;
    })
    .join(" ");
}

function ChartGrid({
  yTicks,
  xTicks,
  height = 56,
  width = 200,
  yMin = DEFAULT_Y_MIN,
  yMax = DEFAULT_Y_MAX,
}: {
  yTicks: number[];
  xTicks: string[];
  height?: number;
  width?: number;
  yMin?: number;
  yMax?: number;
}) {
  return (
    <>
      {yTicks.map((t) => (
        <line
          key={t}
          x1={0}
          y1={metricToY(t, height, yMin, yMax)}
          x2={width}
          y2={metricToY(t, height, yMin, yMax)}
          stroke="white"
          strokeOpacity={0.06}
          strokeDasharray="2 3"
        />
      ))}
      {xTicks.map((label, i) => {
        const x = (i / (xTicks.length - 1)) * width;
        return (
          <line
            key={`vx-${label}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="white"
            strokeOpacity={0.04}
            strokeWidth={0.5}
          />
        );
      })}
      {yTicks.map((t) => (
        <text
          key={`y-${t}`}
          x={0}
          y={metricToY(t, height, yMin, yMax) + 2}
          fill="white"
          fillOpacity={0.25}
          fontSize={5}
          fontFamily="ui-monospace, monospace"
        >
          {t.toFixed(2)}
        </text>
      ))}
      {xTicks.map((label, i) => {
        const x = (i / (xTicks.length - 1)) * width;
        const anchor = i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle";
        return (
          <text
            key={label}
            x={x}
            y={height + 8}
            fill="white"
            fillOpacity={0.25}
            fontSize={5}
            fontFamily="ui-monospace, monospace"
            textAnchor={anchor}
          >
            {label}
          </text>
        );
      })}
    </>
  );
}

function ThresholdLine({
  value,
  label,
  height = 56,
  width = 200,
  yMin = DEFAULT_Y_MIN,
  yMax = DEFAULT_Y_MAX,
}: {
  value: number;
  label: string;
  height?: number;
  width?: number;
  yMin?: number;
  yMax?: number;
}) {
  const y = metricToY(value, height, yMin, yMax);
  return (
    <g>
      <line x1={28} y1={y} x2={width} y2={y} stroke="#f97316" strokeOpacity={0.35} strokeDasharray="3 2" strokeWidth={0.5} />
      <text x={width - 2} y={y - 1} fill="#f97316" fillOpacity={0.6} fontSize={4.5} textAnchor="end" fontFamily="ui-monospace, monospace">
        {label}
      </text>
    </g>
  );
}

function LineSeries({
  values,
  color,
  width = 200,
  height = 56,
  dashed,
  yMin = DEFAULT_Y_MIN,
  yMax = DEFAULT_Y_MAX,
}: {
  values: number[];
  color: string;
  width?: number;
  height?: number;
  dashed?: boolean;
  yMin?: number;
  yMax?: number;
}) {
  const points = buildPoints(values, width, height, yMin, yMax);
  return (
    <g>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? "2 2" : undefined}
        strokeLinejoin="round"
      />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={(i / (values.length - 1)) * width}
          cy={metricToY(v, height, yMin, yMax)}
          r={1.2}
          fill={color}
        />
      ))}
    </g>
  );
}

function ChartLegend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1 text-[6px] text-white/40 font-mono">
          <span
            className="w-3 h-px"
            style={{
              backgroundColor: item.dashed ? "transparent" : item.color,
              borderTop: item.dashed ? `1px dashed ${item.color}` : undefined,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[7px] font-semibold text-white/35 uppercase tracking-[0.14em] font-mono">{children}</div>
  );
}

function MetricTile({
  label,
  value,
  sub,
  valueClass = "text-white",
  mono,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded border border-white/[0.06] bg-zinc-950/80 p-1.5 min-w-0">
      <div className="text-[6px] text-white/35 truncate">{label}</div>
      <div className={`text-sm font-semibold leading-tight mt-0.5 ${valueClass} ${mono ? "font-mono" : ""}`}>{value}</div>
      {sub && <div className="text-[6px] text-white/30 mt-0.5 truncate">{sub}</div>}
    </div>
  );
}

function SeverityPill({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "text-red-400 border-red-500/35 bg-red-500/10",
    High: "text-amber-400 border-amber-600/35 bg-amber-600/10",
    Medium: "text-amber-300 border-amber-500/25 bg-amber-500/8",
  };
  return (
    <span className={`shrink-0 px-1 py-px rounded text-[6px] border font-mono ${styles[severity] ?? styles.Medium}`}>
      {severity}
    </span>
  );
}

function TechnicalChart({
  title,
  series,
  yTicks,
  xTicks,
  thresholds,
  yMin = DEFAULT_Y_MIN,
  yMax = DEFAULT_Y_MAX,
}: {
  title: string;
  series: { label: string; color: string; values: number[]; dashed?: boolean }[];
  yTicks: number[];
  xTicks: string[];
  thresholds?: { value: number; label: string }[];
  yMin?: number;
  yMax?: number;
}) {
  const h = 52;
  const w = 172;
  return (
    <div className="flex flex-col gap-1 min-h-0 flex-1">
      <PanelLabel>{title}</PanelLabel>
      <svg viewBox={`0 0 ${w + 4} ${h + 12}`} className="w-full flex-1 min-h-[72px]" preserveAspectRatio="xMidYMid meet">
        <ChartGrid yTicks={yTicks} xTicks={xTicks} height={h} width={w} yMin={yMin} yMax={yMax} />
        {thresholds?.map((t) => (
          <ThresholdLine key={t.label} value={t.value} label={t.label} height={h} width={w} yMin={yMin} yMax={yMax} />
        ))}
        <g transform="translate(28, 0)">
          {series.map((s) => (
            <LineSeries
              key={s.label}
              values={s.values}
              color={s.color}
              width={w - 28}
              height={h}
              dashed={s.dashed}
              yMin={yMin}
              yMax={yMax}
            />
          ))}
        </g>
      </svg>
      <ChartLegend items={series.map((s) => ({ label: s.label, color: s.color, dashed: s.dashed }))} />
    </div>
  );
}

/* ── panel chrome ────────────────────────────────────────── */

const VARIANT_META: Record<ParallaxPanelVariant, { id: string; channel: string }> = {
  overview: { id: "MOD-OVR", channel: "compliance.overview" },
  findings: { id: "MOD-FND", channel: "findings.queue" },
  monitoring: { id: "MOD-MON", channel: "signals.density" },
  disparity: { id: "MOD-DIR", channel: "metrics.dir.30d" },
  readiness: { id: "MOD-RDY", channel: "exam.composite" },
  air: { id: "MOD-AIR", channel: "cohort.air" },
  proxy: { id: "MOD-PRX", channel: "causal.graph" },
  "adverse-action": { id: "MOD-AA", channel: "regb.reasons" },
  cohort: { id: "MOD-COH", channel: "cohort.dir" },
  drift: { id: "MOD-SPD", channel: "drift.mortgage" },
  evidence: { id: "MOD-EVD", channel: "packet.v2" },
  investigations: { id: "MOD-INV", channel: "investigation.q" },
  report: { id: "MOD-RPT", channel: "fairlending.q2" },
  activity: { id: "MOD-EVT", channel: "event.stream" },
  signals: { id: "MOD-SIG", channel: "rule.engine" },
};

function PanelChrome({ variant, children }: { variant: ParallaxPanelVariant; children: ReactNode }) {
  const meta = VARIANT_META[variant];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0A0A]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.07),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px)",
        }}
      />

      <div className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-l border-t border-amber-500/50" />
      <div className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-r border-t border-amber-500/50" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-amber-500/30" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/90 px-2 py-0.5 font-mono text-[5px] tracking-wide text-white/30">
        <span className="text-amber-500/60">{meta.id}</span>
        <span className="truncate px-1 text-white/20">{meta.channel}</span>
        <span className="flex items-center gap-1 text-emerald-400/80">
          <span className="relative flex h-1 w-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
          </span>
          LIVE
        </span>
      </div>

      <div className="relative h-full pt-5 px-2.5 pb-2.5 font-sans">{children}</div>
    </div>
  );
}

/* ── main export ─────────────────────────────────────────── */

export function ParallaxPanelVisual({ variant }: ParallaxPanelVisualProps) {
  return <PanelChrome variant={variant}>{renderVariant(variant)}</PanelChrome>;
}

function renderVariant(variant: ParallaxPanelVariant) {
  switch (variant) {
    case "overview":
      return (
        <div className="flex flex-col gap-1.5 h-full">
          <div className="rounded border border-red-500/25 bg-red-950/60 px-2 py-1 flex items-center justify-between">
            <span className="text-[7px] text-red-300 font-mono">ALERT · 2 critical findings</span>
            <span className="text-[6px] text-red-400/70">14:32 UTC</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[6px] text-white/40 font-mono border-b border-white/5 pb-1">
            <span>AIR <span className="text-white">1.00</span> · τ 0.80</span>
            <span>SPD <span className="text-white">0.00</span> · τ 0.10</span>
          </div>
          <div className="grid grid-cols-3 gap-1 flex-1">
            <MetricTile label="Critical" value="2" sub="1 active" valueClass="text-red-400" mono />
            <MetricTile label="Readiness" value="70%" sub="↓ degrading" valueClass="text-white" />
            <MetricTile label="Models" value="3/12" sub="↑2 new" mono />
          </div>
          <TechnicalChart
            title="Portfolio DIR · 7d"
            yMin={0.68}
            yMax={1.02}
            yTicks={[1.0, 0.9, 0.8, 0.72]}
            xTicks={["D1", "D3", "D5", "D7"]}
            thresholds={[{ value: 0.8, label: "τ 0.80" }]}
            series={[
              { label: "Mortgage", color: "#f97316", values: [0.98, 0.94, 0.88, 0.82, 0.78, 0.74, 0.72] },
              { label: "Portfolio", color: "#60a5fa", values: [0.99, 0.98, 0.97, 0.96, 0.95, 0.94, 0.93] },
            ]}
          />
        </div>
      );

    case "findings":
      return (
        <div className="flex flex-col gap-1 h-full text-[7px]">
          <PanelLabel>Active Findings · FN queue</PanelLabel>
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-1 gap-y-0.5 text-[5px] text-white/25 font-mono border-b border-white/5 pb-0.5">
            <span>ID</span>
            <span>ISSUE / COHORT</span>
            <span>SEV</span>
          </div>
          {[
            { id: "FN-204", issue: "AIR Breach", cohort: "Hispanic/Latino — Mtg", sev: "Critical", air: "0.72" },
            { id: "FN-199", issue: "Seq. Proxy ρ=0.84", cohort: "Priya K. Sharma", sev: "Critical", air: "—" },
            { id: "FN-203", issue: "Single Proxy Var", cohort: "DeShawn R. Brown", sev: "High", air: "—" },
          ].map((r) => (
            <div key={r.id} className="grid grid-cols-[auto_1fr_auto] gap-x-1 items-start rounded border border-white/[0.05] bg-zinc-950/90 px-1.5 py-1">
              <span className="text-amber-500 font-mono text-[6px]">{r.id}</span>
              <div className="min-w-0">
                <div className="text-white/65 truncate">{r.issue}</div>
                <div className="text-white/30 truncate text-[5px]">{r.cohort}</div>
              </div>
              <SeverityPill severity={r.sev} />
            </div>
          ))}
          <div className="mt-auto text-[5px] text-white/25 font-mono">n=3 · avg age 1.0d · 1 investigating</div>
        </div>
      );

    case "monitoring":
      return (
        <div className="flex flex-col gap-1.5 h-full">
          <div className="grid grid-cols-4 gap-1">
            {[
              { n: 1, l: "CRIT", c: "border-red-500/30 bg-red-500/10 text-red-400" },
              { n: 1, l: "HIGH", c: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
              { n: 0, l: "MED", c: "border-white/10 bg-white/5 text-white/35" },
              { n: 0, l: "LOW", c: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" },
            ].map((b) => (
              <div key={b.l} className={`rounded border p-1 text-center ${b.c}`}>
                <div className="text-xs font-semibold font-mono">{b.n}</div>
                <div className="text-[5px] opacity-60">{b.l}</div>
              </div>
            ))}
          </div>
          <TechnicalChart
            title="Signal density · 7d"
            yMin={0.68}
            yMax={1.02}
            yTicks={[1.0, 0.9, 0.8, 0.72]}
            xTicks={["04/23", "04/25", "04/27", "04/29"]}
            series={[
              { label: "AIR alerts", color: "#f97316", values: [0.98, 0.94, 0.88, 0.82, 0.78, 0.74, 0.72] },
              { label: "Proxy flags", color: "#60a5fa", values: [0.95, 0.96, 0.94, 0.93, 0.95, 0.94, 0.96] },
            ]}
            thresholds={[{ value: 0.8, label: "τ 0.80" }]}
          />
        </div>
      );

    case "disparity":
      return (
        <TechnicalChart
          title="DIR by product · 30d rolling"
          yTicks={[1.05, 0.95, 0.85, 0.72]}
          xTicks={["D1", "D8", "D15", "D22", "D29"]}
          thresholds={[
            { value: 0.95, label: "0.95" },
            { value: 0.85, label: "0.85" },
          ]}
          series={[
            { label: "Mortgage", color: "#f97316", values: [0.98, 0.95, 0.92, 0.88, 0.84, 0.79, 0.76, 0.73, 0.72] },
            { label: "Auto", color: "#fbbf24", values: [0.92, 0.9, 0.88, 0.89, 0.87, 0.88, 0.89, 0.88, 0.88] },
            { label: "Personal", color: "#e5e5e5", values: [0.98, 0.99, 0.97, 0.98, 1.0, 0.99, 0.98, 0.97, 0.99] },
            { label: "Card", color: "#60a5fa", values: [0.97, 0.98, 0.96, 0.97, 0.98, 0.99, 0.97, 0.98, 0.98] },
          ]}
        />
      );

    case "readiness":
      return (
        <div className="flex flex-col h-full gap-1.5">
          <PanelLabel>Exam readiness · composite</PanelLabel>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-semibold font-mono text-white leading-none">70</div>
            <div className="text-[7px] text-white/40 pb-0.5">
              <div className="text-emerald-400/80">Strong</div>
              <div className="text-red-400">Δ −4.2% / 7d</div>
            </div>
          </div>
          <div className="space-y-1 flex-1">
            {[
              { l: "Data completeness", v: 82 },
              { l: "Methodology docs", v: 71 },
              { l: "Open findings", v: 58 },
              { l: "AA notice specificity", v: 64 },
            ].map((row) => (
              <div key={row.l} className="flex items-center gap-1.5">
                <span className="text-[6px] text-white/35 w-16 shrink-0 truncate">{row.l}</span>
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500/80" style={{ width: `${row.v}%` }} />
                </div>
                <span className="text-[6px] font-mono text-white/40 w-6 text-right">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "air":
      return (
        <div className="flex flex-col h-full gap-1.5">
          <PanelLabel>Adverse Impact Ratio · cohort</PanelLabel>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-semibold text-red-400">0.72</span>
            <span className="text-[7px] text-white/35">DIR vs ref</span>
          </div>
          <div className="rounded border border-white/[0.06] bg-zinc-950 p-1.5 space-y-1 text-[6px] font-mono">
            <div className="flex justify-between text-white/40">
              <span>Cohort</span>
              <span className="text-white/60">Hispanic/Latino</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>Product</span>
              <span className="text-white/60">Mortgage</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>Appr. rate</span>
              <span className="text-white/60">61.4% vs 85.2%</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>n (cohort)</span>
              <span className="text-white/60">2,847</span>
            </div>
            <div className="flex justify-between text-red-400/80">
              <span>Four-fifths τ</span>
              <span>0.80 — BREACH</span>
            </div>
          </div>
          <svg viewBox="0 0 100 24" className="w-full h-6 mt-auto">
            <rect x="0" y="4" width="72" height="16" rx="2" fill="#f97316" fillOpacity={0.25} />
            <line x1="80" y1="0" x2="80" y2="24" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="81" y="8" fill="#ef4444" fontSize="5" fontFamily="monospace">
              0.80
            </text>
          </svg>
        </div>
      );

    case "proxy":
      return (
        <div className="flex flex-col gap-1.5 h-full text-[7px]">
          <PanelLabel>Proxy-risk · causal graph</PanelLabel>
          <div className="rounded border border-amber-500/30 bg-amber-500/8 p-1.5 font-mono">
            <div className="text-amber-400 text-[8px]">ZIP_CODE → CREDIT_SCORE</div>
            <div className="text-white/50 mt-1 text-[6px]">ρ = 0.84 · p &lt; 0.001 · n = 12,403</div>
          </div>
          <svg viewBox="0 0 120 50" className="w-full flex-1 min-h-[40px]">
            <circle cx="20" cy="25" r="8" fill="none" stroke="#f97316" strokeWidth="0.8" />
            <text x="20" y="27" fill="#f97316" fontSize="5" textAnchor="middle" fontFamily="monospace">
              ZIP
            </text>
            <line x1="28" y1="25" x2="52" y2="25" stroke="white" strokeOpacity={0.2} strokeWidth={0.6} markerEnd="url(#arr)" />
            <line x1="68" y1="25" x2="92" y2="25" stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2 2" />
            <circle cx="100" cy="25" r="8" fill="none" stroke="#60a5fa" strokeWidth={0.8} />
            <text x="100" y="27" fill="#60a5fa" fontSize="4.5" textAnchor="middle" fontFamily="monospace">
              FICO
            </text>
            <text x="60" y="18" fill="#ef4444" fontSize="4" textAnchor="middle" fontFamily="monospace">
              severed
            </text>
          </svg>
          <div className="text-[6px] text-white/35">Reg B proxy · flagged for MRM review</div>
        </div>
      );

    case "adverse-action":
      return (
        <div className="flex flex-col gap-1 h-full text-[6px]">
          <PanelLabel>AA notice validation · Reg B</PanelLabel>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-1 text-[5px] text-white/25 font-mono border-b border-white/5 pb-0.5">
            <span>REASON CODE</span>
            <span>SPEC</span>
            <span>STAT</span>
          </div>
          {[
            { code: "38", reason: "Insufficient verified income for obligation", spec: "0.91", ok: true },
            { code: "13", reason: "Proportion of balance to limits", spec: "0.88", ok: true },
            { code: "07", reason: "Delinquent past/present obligations", spec: "0.42", ok: false },
          ].map((r) => (
            <div key={r.code} className="grid grid-cols-[1fr_auto_auto] gap-x-1 items-center py-0.5 border-b border-white/[0.04]">
              <div className="min-w-0">
                <span className="text-amber-500/80 font-mono mr-1">{r.code}</span>
                <span className="text-white/55 truncate">{r.reason}</span>
              </div>
              <span className="font-mono text-white/40">{r.spec}</span>
              <span className={r.ok ? "text-emerald-400" : "text-red-400"}>{r.ok ? "PASS" : "FAIL"}</span>
            </div>
          ))}
          <div className="mt-auto text-[5px] text-amber-500/70 font-mono">CFPB Circ. 2023-03 · 71% fail in prod</div>
        </div>
      );

    case "cohort":
      return (
        <div className="flex flex-col gap-1 h-full">
          <PanelLabel>Approval rate · protected class</PanelLabel>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-1 text-[5px] text-white/25 font-mono border-b border-white/5 pb-0.5">
            <span>SEGMENT</span>
            <span>RATE</span>
            <span>DIR</span>
          </div>
          {[
            { s: "White (ref)", rate: "85.2%", dir: "1.00", w: 100 },
            { s: "Hispanic/Latino", rate: "61.4%", dir: "0.72", w: 72 },
            { s: "Black/African Am.", rate: "64.1%", dir: "0.75", w: 75 },
            { s: "Asian", rate: "82.7%", dir: "0.97", w: 97 },
          ].map((row) => (
            <div key={row.s} className="space-y-0.5">
              <div className="flex justify-between text-[6px]">
                <span className="text-white/50 truncate">{row.s}</span>
                <span className="font-mono text-white/40">
                  {row.rate} · {row.dir}
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${row.dir === "1.00" ? "bg-white/30" : Number(row.dir) < 0.8 ? "bg-red-500/70" : "bg-amber-500/60"}`}
                  style={{ width: `${row.w}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );

    case "drift":
      return (
        <TechnicalChart
          title="SPD drift · mortgage cohort"
          yMin={0}
          yMax={0.12}
          yTicks={[0.12, 0.08, 0.04, 0.0]}
          xTicks={["W1", "W2", "W3", "W4"]}
          thresholds={[{ value: 0.1, label: "τ 0.10" }]}
          series={[
            {
              label: "SPD",
              color: "#f97316",
              values: [0.02, 0.03, 0.05, 0.07, 0.09, 0.11, 0.1],
            },
            {
              label: "Control band",
              color: "#ffffff",
              values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
              dashed: true,
            },
          ]}
        />
      );

    case "evidence":
      return (
        <div className="flex flex-col gap-1 h-full text-[6px]">
          <PanelLabel>Evidence packet · v2.4.1</PanelLabel>
          {[
            { s: "§4.2", title: "Cohort methodology", pages: 12, status: "complete" },
            { s: "§5.1", title: "DIR / AIR analysis", pages: 8, status: "complete" },
            { s: "§6.3", title: "Open findings log", pages: 3, status: "draft" },
            { s: "§7.0", title: "Limitations & caveats", pages: 2, status: "complete" },
          ].map((item) => (
            <div key={item.s} className="flex items-center gap-1.5 rounded border border-white/[0.05] bg-zinc-950/90 px-1.5 py-1">
              <span className="font-mono text-amber-500/70 w-6">{item.s}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white/60 truncate">{item.title}</div>
                <div className="text-white/25">{item.pages} pp</div>
              </div>
              <span className={`font-mono text-[5px] ${item.status === "complete" ? "text-emerald-400" : "text-amber-400"}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      );

    case "investigations":
      return (
        <div className="flex flex-col h-full gap-1">
          <PanelLabel>Investigation queue</PanelLabel>
          <div className="grid grid-cols-3 gap-1">
            <MetricTile label="Open" value="1" valueClass="text-amber-400" mono />
            <MetricTile label="In review" value="0" mono />
            <MetricTile label="Closed 7d" value="2" mono />
          </div>
          <div className="flex-1 space-y-1 mt-1">
            {[
              { id: "INV-041", owner: "J. Torres", age: "1.0d", pri: "P1" },
              { id: "INV-038", owner: "K. Osei", age: "2.4d", pri: "P2" },
            ].map((inv) => (
              <div key={inv.id} className="flex justify-between rounded border border-white/[0.05] bg-zinc-950 px-1.5 py-1 text-[6px] font-mono">
                <span className="text-amber-500/80">{inv.id}</span>
                <span className="text-white/40">{inv.owner}</span>
                <span className="text-white/30">{inv.age}</span>
                <span className="text-red-400/80">{inv.pri}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "report":
      return (
        <div className="flex flex-col h-full gap-1">
          <PanelLabel>Fair lending report · Q2 2026</PanelLabel>
          <div className="flex-1 rounded border border-white/[0.06] bg-zinc-950 p-2 font-mono text-[5px] text-white/40 space-y-1">
            <div className="text-white/60 text-[7px]">EXAM READINESS SUMMARY</div>
            <div className="h-px bg-white/10" />
            <div>1. Statistical parity · PASS (SPD 0.00)</div>
            <div>2. Disparate impact · REVIEW (AIR 0.72)</div>
            <div>3. AA specificity · FAIL (29%)</div>
            <div>4. Proxy variables · 2 flagged</div>
            <div className="h-px bg-white/10 mt-1" />
            <div className="text-amber-500/70">Generated 2026-04-29T14:32Z</div>
          </div>
        </div>
      );

    case "activity":
      return (
        <div className="flex flex-col gap-1 h-full text-[6px]">
          <PanelLabel>Event log · stream</PanelLabel>
          {[
            { ts: "14:32:08", id: "EVT-20260429-0001", msg: "Causal proof bundle signed · mortgage", sev: "info" },
            { ts: "14:28:41", id: "EVT-20260429-0002", msg: "ZIP_CODE severed from score path", sev: "med" },
            { ts: "14:15:02", id: "EVT-20260429-0003", msg: "DIR recalc triggered · Hispanic/Latino", sev: "high" },
          ].map((e) => (
            <div key={e.id} className="rounded border border-white/[0.05] bg-zinc-950/90 px-1.5 py-1 font-mono">
              <div className="flex justify-between text-white/25">
                <span>{e.ts}</span>
                <span className={e.sev === "high" ? "text-red-400" : e.sev === "med" ? "text-amber-400" : "text-white/30"}>
                  {e.sev.toUpperCase()}
                </span>
              </div>
              <div className="text-white/55 mt-0.5 leading-snug">{e.msg}</div>
              <div className="text-white/25 mt-0.5">{e.id}</div>
            </div>
          ))}
        </div>
      );

    case "signals":
      return (
        <div className="flex flex-col gap-1.5 h-full">
          <div className="flex gap-2 text-[7px] font-mono border-b border-white/5 pb-1">
            <span className="text-amber-500 border-b border-amber-500 pb-0.5">Signals</span>
            <span className="text-white/25">Rules</span>
            <span className="text-white/25">ML</span>
          </div>
          {[
            { sig: "AIR_BREACH_MORTGAGE", val: "0.72", conf: "0.97", st: "FIRING" },
            { sig: "PROXY_CORR_HIGH", val: "ρ=0.84", conf: "0.99", st: "FIRING" },
            { sig: "SPD_WITHIN_BAND", val: "0.00", conf: "0.95", st: "OK" },
          ].map((s) => (
            <div key={s.sig} className="grid grid-cols-[1fr_auto] gap-1 text-[6px] font-mono border-b border-white/[0.04] pb-1">
              <div>
                <div className="text-white/55">{s.sig}</div>
                <div className="text-white/30">
                  {s.val} · conf {s.conf}
                </div>
              </div>
              <span className={s.st === "FIRING" ? "text-red-400" : "text-emerald-400"}>{s.st}</span>
            </div>
          ))}
          <svg viewBox="0 0 80 16" className="w-full h-4 mt-auto opacity-60">
            <polyline points="0,12 10,10 20,11 30,8 40,9 50,6 60,7 70,5 80,6" fill="none" stroke="#f97316" strokeWidth="0.8" />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
