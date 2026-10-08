import { createFileRoute, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Database,
  FileCheck2,
  Workflow,
  Rocket,
  ScrollText,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Leaf,
  Factory,
  Droplets,
  Zap,
  Users,
  AlertTriangle,
  Target,
  LineChart,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/console")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
  },
  component: ConsolePage,
});

type LucideIcon = React.ComponentType<{ className?: string }>;

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  kind: "scroll" | "route";
  to?: "/nda" | "/admin";
  badge?: string;
}

interface NavGroup {
  heading: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Overview",
    items: [
      { id: "dashboard", label: "Command Deck", icon: LayoutDashboard, kind: "scroll" },
      { id: "barbados", label: "Barbados Pilot", icon: Globe, kind: "scroll", badge: "LIVE" },
    ],
  },
  {
    heading: "Delivery · 5 Phases",
    items: [
      { id: "foundation", label: "I · Foundation Locks", icon: ScrollText, kind: "scroll" },
      { id: "technical", label: "II · Technical Build", icon: Database, kind: "scroll" },
      { id: "governance", label: "III · Governance & NEXUS", icon: ShieldCheck, kind: "scroll" },
      { id: "deployment", label: "IV · Deployment", icon: Rocket, kind: "scroll" },
      { id: "advanced", label: "V · Advanced & Loop", icon: Workflow, kind: "scroll" },
    ],
  },
  {
    heading: "Control Towers",
    items: [
      { id: "tower-executive", label: "Executive", icon: Target, kind: "scroll" },
      { id: "tower-supply", label: "Supply Chain", icon: Factory, kind: "scroll" },
      { id: "tower-utilities", label: "Utilities", icon: Zap, kind: "scroll" },
      { id: "tower-water", label: "Water & Compute", icon: Droplets, kind: "scroll" },
      { id: "tower-climate", label: "Climate / Nature", icon: Leaf, kind: "scroll" },
      { id: "tower-risk", label: "Risk / Resilience", icon: AlertTriangle, kind: "scroll" },
    ],
  },
  {
    heading: "Assurance",
    items: [
      { id: "mrv", label: "MRV & BTR", icon: LineChart, kind: "scroll" },
      { id: "nda", label: "NDA Registry", icon: FileCheck2, kind: "route", to: "/nda" },
      { id: "evidence", label: "Evidence & Reports", icon: FileText, kind: "scroll" },
      { id: "people", label: "People & Partners", icon: Users, kind: "scroll" },
      { id: "admin", label: "Administration", icon: ShieldCheck, kind: "route", to: "/admin" },
    ],
  },
];

const PHASES = [
  {
    num: "I",
    id: "foundation",
    title: "Foundation & Architecture Locks",
    desc: "953 controlled architecture locks under R1_BASELINE (Section 2245). Constitution, canonical model, three facets and digital twin thread.",
    functions: ["constitution-ref", "final-lock-compliance"],
    status: "ACTIVE",
  },
  {
    num: "II",
    id: "technical",
    title: "Technical Implementation",
    desc: "Data federation, KPI measurement, GHG Scope 3 tracking, BTR-MRV framework, API/AsyncAPI/OpenAPI integrations.",
    functions: ["data-federation", "kpi-measurement", "ghg-scope3", "btr-mrv", "api-integration"],
    status: "ACTIVE",
  },
  {
    num: "III",
    id: "governance",
    title: "Governance, Security & NEXUS",
    desc: "Governance policies, security protocols, privacy architecture, NEXUS system configuration and BARBADOS pilot integration.",
    functions: ["governance-security", "nexus-system", "barbados-pilot"],
    status: "ACTIVE",
  },
  {
    num: "IV",
    id: "deployment",
    title: "Deployment & Integration Validation",
    desc: "Deployment configuration, cross-facet integration validation and final 953-lock compliance verification.",
    functions: ["deployment-config", "integration-validation"],
    status: "ACTIVE",
  },
  {
    num: "V",
    id: "advanced",
    title: "Advanced Features & Workflow Loop",
    desc: "Testing framework, performance optimization, advanced orchestration and 20-iteration integrated workflow loop.",
    functions: ["testing-framework", "performance-optimization", "advanced-features", "workflow-loop"],
    status: "ACTIVE",
  },
];

function ConsolePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    try {
      localStorage.removeItem("e3-nda-identity");
    } catch {
      // ignore
    }
    navigate({ to: "/", replace: true });
  }, [navigate]);

  const scrollTo = useCallback((id: string) => {
    setActive(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const initials = useMemo(() => {
    if (!email) return "··";
    return email
      .split("@")[0]
      .split(/[._-]/)
      .map((p) => p[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  }, [email]);

  return (
    <div className="e3-app flex min-h-screen">
      <ConsoleSidebar
        email={email}
        active={active}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onJump={scrollTo}
      />
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-[60px]" : "lg:pl-[240px]"
        }`}
      >
        <ConsoleTopBar email={email} initials={initials} onSignOut={signOut} />
        <main className="e3-scroll min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <CommandDeck email={email} onJump={scrollTo} />
          <BarbadosPanel />
          {PHASES.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} />
          ))}
          <TowerGrid />
          <AssurancePanels />
          <PageFooter />
        </main>
      </div>
    </div>
  );
}

function PhaseSection({ phase }: { phase: (typeof PHASES)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={phase.id} className="e3-card e3-glass mb-6 scroll-mt-20">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/5"
      >
        <span className="e3-gradient grid h-10 w-10 shrink-0 place-items-center rounded-lg font-serif text-[16px] font-bold text-[#05203a]">
          {phase.num}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[17px] font-medium text-slate-100">{phase.title}</h2>
            <span className="e3-mono rounded bg-emerald-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-300">
              {phase.status}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{phase.desc}</p>
        </div>
        <span className="e3-mono text-[10px] text-slate-500">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-white/10 px-5 py-4">
          <div className="e3-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
            Deployed Functions ({phase.functions.length})
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {phase.functions.map((fn) => (
              <a
                key={fn}
                href={`${import.meta.env.VITE_SUPABASE_URL ?? ""}/functions/v1/${fn}`}
                target="_blank"
                rel="noopener"
                className="e3-mono flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
              >
                <span>{fn}</span>
                <span className="text-[9px] text-slate-500">invoke →</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ConsoleSidebar({
  email,
  active,
  collapsed,
  onToggle,
  onJump,
}: {
  email: string;
  active: string;
  collapsed: boolean;
  onToggle: () => void;
  onJump: (id: string) => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex-col border-r border-white/10 bg-[#0b1220]/95 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      } hidden lg:flex`}
    >
      <Link
        to="/"
        title="Back to dossier"
        className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/10 px-4 transition-colors hover:bg-white/5"
      >
        <span className="e3-gradient grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[13px] font-bold text-[#05203a]">
          E3
        </span>
        {!collapsed && (
          <span className="text-sm font-bold uppercase tracking-wide text-slate-100">Elas3City</span>
        )}
      </Link>
      {!collapsed && (
        <div className="shrink-0 border-b border-white/10 px-4 py-2.5">
          <div className="e3-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
            Operator session
          </div>
          <div className="truncate text-[11px] font-semibold text-slate-200" title={email}>
            {email || "…"}
          </div>
          <div className="e3-mono truncate text-[10px] text-slate-500">R1 Baseline · 953 locks</div>
        </div>
      )}
      <nav className="e3-scroll min-h-0 flex-1 overflow-y-auto px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.heading} className="mb-3">
            {!collapsed && (
              <div className="px-3 pb-1 pt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                {group.heading}
              </div>
            )}
            {collapsed && <div className="mx-3 mb-2 border-t border-white/10" />}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarLink
                  key={item.id}
                  item={item}
                  active={active}
                  collapsed={collapsed}
                  onJump={onJump}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="shrink-0 border-t border-white/10 p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  active,
  collapsed,
  onJump,
}: {
  item: NavItem;
  active: string;
  collapsed: boolean;
  onJump: (id: string) => void;
}) {
  const isActive = active === item.id;
  const cls = `flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
    isActive
      ? "e3-nav-active border border-sky-400/30"
      : "border border-transparent text-slate-300 hover:bg-white/5 hover:text-slate-100"
  } ${collapsed ? "justify-center px-2" : ""}`;
  const Icon = item.icon;
  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="e3-mono rounded bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
          {item.badge}
        </span>
      )}
    </>
  );
  if (item.kind === "route" && item.to) {
    return (
      <Link to={item.to} className={cls} title={item.label}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={() => onJump(item.id)} className={cls} title={item.label}>
      {inner}
    </button>
  );
}

function ConsoleTopBar({
  email,
  initials,
  onSignOut,
}: {
  email: string;
  initials: string;
  onSignOut: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-[#0b1220]/85 px-4 backdrop-blur-xl sm:px-6">
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-slate-100">ELAS-3-CITY Console</div>
        <div className="e3-mono text-[9px] tracking-[0.18em] text-slate-500">
          V4.0 · SECTION 2245 · 953 LOCKS
        </div>
      </div>
      <div
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex"
        title="Signed-in session"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-[10px] font-bold text-[#05203a]">
          {initials}
        </span>
        <span className="e3-mono max-w-[220px] truncate text-[11px] text-slate-300">{email}</span>
      </div>
      <button
        onClick={onSignOut}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-rose-400/40 hover:text-rose-300"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </header>
  );
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / range) * 24}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className={`h-7 w-full ${className ?? ""}`}>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function GlassMetric({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: number[];
}) {
  return (
    <div className="e3-card e3-glass-subtle p-4">
      {trend && <Sparkline data={trend} className="mb-1 text-sky-400/70" />}
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-xl font-semibold text-slate-100">{value}</div>
      {sub && <div className="e3-mono mt-0.5 text-[10px] text-slate-500">{sub}</div>}
    </div>
  );
}

function CommandDeck({ email, onJump }: { email: string; onJump: (id: string) => void }) {
  return (
    <section id="dashboard" className="mx-auto max-w-6xl scroll-mt-20 space-y-4">
      <div className="e3-card e3-glass p-6 sm:p-8">
        <div className="e3-mono text-[10px] tracking-[0.22em] text-emerald-400">
          CLEARANCE VERIFIED · FULL PLATFORM ACCESS
        </div>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-slate-100 sm:text-[36px]">
          Command deck
        </h1>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-slate-400">
          Signed in as <span className="e3-mono text-slate-200">{email || "…"}</span>. The complete
          five-phase platform build — data federation, KPI measurement, GHG Scope 3, governance,
          NEXUS orchestration and the 20-iteration workflow loop. Architecture locks preserved
          under R1_BASELINE.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => onJump(p.id)}
              className="e3-mono rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              {p.num} · {p.title}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GlassMetric label="Phases" value="5" sub="Foundation → Advanced" trend={[2, 3, 4, 5]} />
        <GlassMetric label="Edge functions" value="13" sub="All ACTIVE" trend={[9, 11, 12, 13]} />
        <GlassMetric label="Architecture locks" value="953" sub="Section 2245" trend={[948, 950, 951, 953]} />
        <GlassMetric label="Compliance" value="100%" sub="R1 baseline" trend={[96, 98, 99, 100]} />
      </div>
    </section>
  );
}

function BarbadosPanel() {
  return (
    <section id="barbados" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-4">
      <header>
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">
          LIVE PILOT · BARBADOS
        </div>
        <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
          Barbados pilot — BTR readiness
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Pilot data feeds, CRT traceability and ETF reporting readiness. Populated from the
          R1 handover workbooks; live Supabase tables land here next.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <GlassMetric label="Pilot readiness" value="78%" sub="Target 100%" trend={[40, 55, 68, 78]} />
        <GlassMetric label="Data sources mapped" value="34" sub="Target 41" trend={[12, 20, 28, 34]} />
        <GlassMetric label="CRT traceability" value="91%" sub="Target 100%" trend={[60, 74, 84, 91]} />
      </div>
      <div className="e3-card e3-glass-subtle p-4">
        <div className="e3-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Source workbooks
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            "Barbados_Data_Acquisition_R1",
            "Barbados_Pilot_R1",
            "ETF_CRT_UID traceability",
            "Data inventory + institutional map",
          ].map((s) => (
            <span
              key={s}
              className="e3-mono rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const TOWERS = [
  { id: "tower-executive", name: "Executive", question: "Are we on track, and what needs a decision today?" },
  { id: "tower-supply", name: "Supply Chain", question: "Where is value leaking, and which intervention pays back fastest?" },
  { id: "tower-utilities", name: "Utilities", question: "Energy and water flows — variance vs baseline?" },
  { id: "tower-water", name: "Water & Compute", question: "Is compute keeping up with MRV ingestion?" },
  { id: "tower-climate", name: "Climate / Nature", question: "GHG Scope 3 and ecosystem-service tracking — credible?" },
  { id: "tower-risk", name: "Risk / Resilience", question: "What could break the pilot, and is it mitigated?" },
];

function TowerGrid() {
  return (
    <section id="tower-grid" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-4">
      <header>
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">
          CONTROL TOWERS · HUMAN DECISION EXPERIENCE
        </div>
        <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
          Six towers, one event → decision thread
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          EVENT → CONTEXT → STATE → CHANGE → SIGNIFICANCE → DIAGNOSIS → SCENARIO → OPTIONS →
          TRADE-OFFS → RECOMMENDATION → EVIDENCE → AUTHORITY → DECISION.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {TOWERS.map((t) => (
          <div key={t.id} id={t.id} className="e3-card e3-glass scroll-mt-20 p-4">
            <div className="text-[13px] font-semibold text-slate-100">{t.name}</div>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{t.question}</p>
            <div className="e3-mono mt-3 text-[9px] uppercase tracking-[0.18em] text-slate-500">
              Tower active · NEXUS context feed
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AssurancePanels() {
  return (
    <>
      <section id="mrv" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-4">
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">
          MRV & BTR · MEASUREMENT
        </div>
        <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
          BTR-MRV verification state
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <GlassMetric label="BTR records verified" value="1,208" sub="Target 1,400" trend={[600, 840, 1020, 1208]} />
          <GlassMetric label="QA/QC pass rate" value="96%" sub="Target 98%" trend={[90, 92, 94, 96]} />
          <GlassMetric label="Ingestion lag" value="42s" sub="Target <60s" trend={[120, 90, 61, 42]} />
        </div>
      </section>

      <section id="evidence" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-4">
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">
          EVIDENCE & REPORTS · DECISION LOG
        </div>
        <div className="space-y-3">
          {[
            {
              tower: "Executive",
              rec: "Freeze R1 baseline at 953 locks; route new asks through change control.",
              dec: "Baseline frozen — Section 2245 preserved.",
              auth: "ANOVA · R1 Baseline Board",
              status: "Decided",
            },
            {
              tower: "Barbados Pilot",
              rec: "Stand up 7 remaining data feeds before the BTR submission window.",
              dec: "Pending — needs pilot authority sign-off.",
              auth: "Barbados pilot lead",
              status: "Awaiting authority",
            },
            {
              tower: "Supply Chain",
              rec: "Prioritise 3 interventions with <6-month payback for MVP scope.",
              dec: "Under review with commercial workstream.",
              auth: "Commercial / MVP board",
              status: "In review",
            },
          ].map((d) => (
            <div key={d.tower} className="e3-card e3-glass-subtle p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-100">{d.tower}</span>
                <span
                  className={`e3-mono rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    d.status === "Decided"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : d.status === "Awaiting authority"
                        ? "bg-amber-400/15 text-amber-300"
                        : "bg-sky-400/15 text-sky-300"
                  }`}
                >
                  {d.status}
                </span>
              </div>
              <div className="mt-2 grid gap-3 text-[12px] leading-relaxed sm:grid-cols-2">
                <div>
                  <span className="e3-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
                    Recommendation
                  </span>
                  <p className="text-slate-300">{d.rec}</p>
                </div>
                <div>
                  <span className="e3-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
                    Decision · Authority
                  </span>
                  <p className="text-slate-300">{d.dec}</p>
                  <p className="e3-mono mt-0.5 text-[10px] text-slate-500">{d.auth}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="people" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-3">
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">
          PEOPLE & PARTNERS
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <GlassMetric label="Named recipients" value="12" sub="NDA-signed" trend={[4, 7, 10, 12]} />
          <GlassMetric label="Institutional partners" value="6" sub="Barbados ecosystem" trend={[2, 3, 5, 6]} />
          <GlassMetric label="Authority roles" value="4" sub="Board / pilot / commercial / NEXUS" />
        </div>
      </section>
    </>
  );
}

function PageFooter() {
  return (
    <footer className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center">
      <p className="e3-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        ELAS-3-CITY · V4.0 · 953 LOCKS · SECTION 2245 · R1_BASELINE PRESERVED
      </p>
    </footer>
  );
}
