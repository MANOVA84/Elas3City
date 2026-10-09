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
  Map,
  Landmark,
  Handshake,
  KeyRound,
  PlugZap,
  GitBranch,
  Bell,
  Building2,
  Cpu,
  Radio,
  Gauge,
  Recycle,
  Package,
  Truck,
  Cloud,
  BarChart3,
  Lock,
  Eye,
  HardDrive,
  History,
  Boxes,
  BookOpen,
  Activity,
  Network,
  FlaskConical,
  Layers,
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
    heading: "Architecture · Wireframe",
    items: [
      { id: "access", label: "Access & Actors", icon: Users, kind: "scroll" },
      { id: "experience", label: "Experience Layer", icon: LayoutDashboard, kind: "scroll" },
      { id: "platform", label: "Platform Services", icon: Layers, kind: "scroll" },
      { id: "pillars", label: "Delivery Pillars", icon: Boxes, kind: "scroll" },
      { id: "data-foundation", label: "Data Foundation", icon: Database, kind: "scroll" },
      { id: "nexus", label: "NEXUS Intelligence", icon: Network, kind: "scroll" },
      { id: "external", label: "External Systems", icon: PlugZap, kind: "scroll" },
      { id: "controls", label: "Cross-Cutting Controls", icon: Lock, kind: "scroll" },
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
    heading: "Use Cases & Decisions",
    items: [
      { id: "use-cases", label: "Use Case Library", icon: FileText, kind: "scroll" },
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
    functions: [
      "testing-framework",
      "performance-optimization",
      "advanced-features",
      "workflow-loop",
    ],
    status: "ACTIVE",
  },
];

/* ── V4.0 wireframe: layered platform architecture ── */
interface WireCard {
  icon: LucideIcon;
  label: string;
  note: string;
}

interface WireGroup {
  name: string;
  icon: LucideIcon;
  color: "emerald" | "sky" | "teal" | "amber" | "rose" | "violet";
  items: WireCard[];
}

interface WireLayer {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  color: string;
  groups: WireGroup[];
}

const PILLAR_COLOR = {
  emerald: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  sky: "text-sky-300 border-sky-400/30 bg-sky-400/10",
  teal: "text-teal-300 border-teal-400/30 bg-teal-400/10",
  amber: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  rose: "text-rose-300 border-rose-400/30 bg-rose-400/10",
  violet: "text-violet-300 border-violet-400/30 bg-violet-400/10",
} as const;

const WIRE_LAYERS: WireLayer[] = [
  {
    id: "access",
    eyebrow: "Access",
    title: "User & Organisation Access",
    intro:
      "Who can enter the platform. Government bodies, community pods & DAOs, partners & utilities, and assurance reviewers each reach only the surfaces their role permits.",
    color: "text-slate-500",
    groups: [
      {
        name: "Government & Organisations",
        icon: Landmark,
        color: "sky",
        items: [
          {
            icon: Users,
            label: "Ministries & agencies",
            note: "Statutory leads accountable for reporting.",
          },
          {
            icon: Building2,
            label: "Municipal operators",
            note: "City services & utility coordination.",
          },
        ],
      },
      {
        name: "Community Pods & DAOs",
        icon: Users,
        color: "emerald",
        items: [
          { icon: Users, label: "Resident pods", note: "Neighbourhood-level inputs & feedback." },
          {
            icon: Network,
            label: "DAO coordinators",
            note: "Representative voting & attestation.",
          },
        ],
      },
      {
        name: "Partners & Utilities",
        icon: Handshake,
        color: "teal",
        items: [
          { icon: Zap, label: "Utility partners", note: "Energy, water & telecom operators." },
          { icon: Truck, label: "Logistics & suppliers", note: "Scope 3A / 3B event sources." },
        ],
      },
      {
        name: "Assurance & Reviewers",
        icon: ShieldCheck,
        color: "amber",
        items: [
          {
            icon: FileCheck2,
            label: "Assurance reviewers",
            note: "Independent verification of evidence.",
          },
          { icon: Eye, label: "Auditors", note: "Read-mostly, fully lineage-tracked." },
        ],
      },
    ],
  },
  {
    id: "experience",
    eyebrow: "Experience",
    title: "Experience Layer",
    intro:
      "The human surfaces: role-based portals & dashboards, workflow / approval / notification routing, GIS & spatial views, and report & evidence views.",
    color: "text-slate-500",
    groups: [
      {
        name: "Portals & Dashboards",
        icon: LayoutDashboard,
        color: "sky",
        items: [
          {
            icon: LayoutDashboard,
            label: "Role-based portals",
            note: "Views scoped to each actor's remit.",
          },
          { icon: BarChart3, label: "Dashboards", note: "Command deck + tower KPIs." },
        ],
      },
      {
        name: "Workflow & Approvals",
        icon: Workflow,
        color: "emerald",
        items: [
          { icon: Workflow, label: "Workflows", note: "Event → decision → action routing." },
          {
            icon: Bell,
            label: "Approvals & notifications",
            note: "Authority sign-off before execution.",
          },
        ],
      },
      {
        name: "GIS & Spatial Views",
        icon: Map,
        color: "teal",
        items: [
          { icon: Map, label: "Spatial views", note: "Assets & meters mapped to geography." },
          { icon: Globe, label: "Public data overlay", note: "Context from open GIS layers." },
        ],
      },
      {
        name: "Reports & Evidence",
        icon: FileText,
        color: "amber",
        items: [
          { icon: FileText, label: "Reports", note: "BTR / SDG indicator outputs." },
          { icon: ScrollText, label: "Evidence views", note: "Traceable, provenance-linked." },
        ],
      },
    ],
  },
  {
    id: "platform",
    eyebrow: "Platform",
    title: "Shared Platform Services",
    intro:
      "The common service plane every tower consumes: identity / roles / policy, integration gateway, workflow & event services, ingestion & validation, evidence / audit / provenance, and notifications.",
    color: "text-emerald-400",
    groups: [
      {
        name: "Identity, Roles & Policy",
        icon: KeyRound,
        color: "rose",
        items: [
          { icon: Lock, label: "Least privilege", note: "Policy enforced at every boundary." },
        ],
      },
      {
        name: "Integration Gateway",
        icon: PlugZap,
        color: "sky",
        items: [
          { icon: GitBranch, label: "API & integration", note: "OpenAPI / AsyncAPI contracts." },
        ],
      },
      {
        name: "Workflow & Event Services",
        icon: Workflow,
        color: "emerald",
        items: [
          { icon: Activity, label: "Event bus", note: "Triggered, auditable orchestration." },
        ],
      },
      {
        name: "Ingestion & Validation",
        icon: Database,
        color: "teal",
        items: [{ icon: ShieldCheck, label: "Quality gates", note: "Schema + confidence checks." }],
      },
      {
        name: "Evidence, Audit & Provenance",
        icon: ScrollText,
        color: "amber",
        items: [{ icon: FileCheck2, label: "Lineage", note: "Every number traceable to source." }],
      },
      {
        name: "Notifications & Reporting",
        icon: Bell,
        color: "violet",
        items: [{ icon: FileText, label: "Reporting", note: "Scheduled & event-driven outputs." }],
      },
    ],
  },
  {
    id: "pillars",
    eyebrow: "Pillars",
    title: "Delivery Pillars — Supply Chain · Compute · Utilities",
    intro:
      "The three measured domains. Each pillar emits standardised events into the shared data foundation and is governed by the same NEXUS controls.",
    color: "text-emerald-400",
    groups: [
      {
        name: "Supply Chain",
        icon: Factory,
        color: "emerald",
        items: [
          { icon: Package, label: "Movable assets & inventory", note: "Tagged, traceable stock." },
          {
            icon: Truck,
            label: "Supplier / logistics events",
            note: "Fleet & shipment telemetry.",
          },
          {
            icon: Recycle,
            label: "Lifecycle, returns & recovery",
            note: "Circular-flow tracking.",
          },
          { icon: Leaf, label: "Scope 3A / 3B", note: "Upstream & downstream emissions." },
        ],
      },
      {
        name: "Compute Resources",
        icon: Cpu,
        color: "sky",
        items: [
          { icon: Cloud, label: "Cloud / workload resources", note: "Usage & workload telemetry." },
          { icon: Cpu, label: "Software & hardware lifecycle", note: "Refresh & decommissioning." },
          {
            icon: BarChart3,
            label: "Usage, efficiency & cost",
            note: "Right-sizing & spend per KPI.",
          },
          {
            icon: HardDrive,
            label: "E-waste & resource evidence",
            note: "Disposal & recovery proof.",
          },
        ],
      },
      {
        name: "Utilities",
        icon: Zap,
        color: "teal",
        items: [
          { icon: Zap, label: "Energy", note: "Consumption & carbon intensity." },
          { icon: Droplets, label: "Water & sanitation", note: "Withdrawal & quality events." },
          { icon: Radio, label: "Telecommunications", note: "Network & connectivity." },
          {
            icon: Gauge,
            label: "Metering & consumption evidence",
            note: "Metered, validated data.",
          },
        ],
      },
    ],
  },
  {
    id: "data-foundation",
    eyebrow: "Foundation",
    title: "Shared Data & Measurement Foundation",
    intro:
      "One canonical model and variable dictionary so a methodology maps cleanly to a variable, a KPI and its scope — with evidence quality and SDG mapping intact.",
    color: "text-sky-400",
    groups: [
      {
        name: "Canonical Model",
        icon: Database,
        color: "sky",
        items: [{ icon: Boxes, label: "Canonical data & metadata", note: "Single agreed schema." }],
      },
      {
        name: "Variable Dictionary",
        icon: BookOpen,
        color: "emerald",
        items: [
          { icon: FlaskConical, label: "MSVS", note: "Method → variable → KPI traceability." },
        ],
      },
      {
        name: "Scopes & Boundaries",
        icon: Boxes,
        color: "teal",
        items: [
          { icon: Layers, label: "Scopes & boundaries", note: "What is in and out of measure." },
        ],
      },
      {
        name: "Evidence Quality",
        icon: BarChart3,
        color: "amber",
        items: [
          { icon: Gauge, label: "Confidence scoring", note: "Quality grade per data point." },
        ],
      },
      {
        name: "SDG Mapping",
        icon: Leaf,
        color: "emerald",
        items: [{ icon: Target, label: "Indicator mapping", note: "KPIs mapped to SDGs." }],
      },
    ],
  },
  {
    id: "nexus",
    eyebrow: "NEXUS",
    title: "Governed Measurement & Intelligence Layer",
    intro:
      "NEXUS measures, explains, validates and proposes — but never independently authorises actions. Execution remains subject to ELAS identity, policy, evidence and approval controls.",
    color: "text-violet-400",
    groups: [
      {
        name: "Core Loop",
        icon: FlaskConical,
        color: "violet",
        items: [
          {
            icon: Activity,
            label: "Measure · Explain · Validate",
            note: "Interpret the evidence.",
          },
          { icon: Network, label: "Interactions & synergies", note: "Cross-pillar trade-offs." },
        ],
      },
      {
        name: "Recommendations",
        icon: Target,
        color: "sky",
        items: [
          {
            icon: BarChart3,
            label: "Scenarios & recommendations",
            note: "Costed, evidence-linked options.",
          },
          { icon: FileCheck2, label: "Evidence-linked outputs", note: "Each output is auditable." },
        ],
      },
    ],
  },
  {
    id: "external",
    eyebrow: "External",
    title: "External Systems & Data Sources",
    intro:
      "Authoritative systems outside the boundary: ERP / WMS / TMS, utility meters, cloud telemetry, GIS / public data, and approved methodology sources.",
    color: "text-teal-400",
    groups: [
      {
        name: "Enterprise Systems",
        icon: Building2,
        color: "amber",
        items: [
          { icon: Truck, label: "ERP / WMS / TMS", note: "Financially-authoritative records." },
        ],
      },
      {
        name: "Meter Data",
        icon: Gauge,
        color: "teal",
        items: [{ icon: Zap, label: "Utility & meter data", note: "Consumption at source." }],
      },
      {
        name: "Cloud Telemetry",
        icon: Cloud,
        color: "sky",
        items: [{ icon: Cpu, label: "Compute telemetry", note: "Workload & spend signals." }],
      },
      {
        name: "GIS / Public Data",
        icon: Map,
        color: "emerald",
        items: [{ icon: Globe, label: "Public datasets", note: "Open geospatial context." }],
      },
      {
        name: "Methodology Sources",
        icon: BookOpen,
        color: "violet",
        items: [
          { icon: FlaskConical, label: "Approved methodologies", note: "Indicator provenance." },
        ],
      },
    ],
  },
];

const CONTROL_LIST = [
  { icon: Lock, label: "Identity & Least Privilege", note: "Role-scoped access everywhere." },
  { icon: ShieldCheck, label: "Privacy & Data Governance", note: "Lawful, minimised, consented." },
  { icon: Eye, label: "Cybersecurity / Zero Trust", note: "Never trust, always verify." },
  { icon: ScrollText, label: "Auditability & Evidence", note: "Immutable, traceable records." },
  { icon: Activity, label: "Monitoring / Observability", note: "Continuous platform telemetry." },
  { icon: HardDrive, label: "Backup / DR / Resilience", note: "Recoverable by design." },
  { icon: History, label: "Version & Change Control", note: "Baseline-locked delivery." },
];

/* Use-case library — derived from the wireframe's decision surfaces. */
interface UseCase {
  id: string;
  actor: string;
  icon: LucideIcon;
  title: string;
  tower: string;
  flow: string;
  output: string;
}

const USE_CASES: UseCase[] = [
  {
    id: "uc-utility-variance",
    actor: "Utility operator",
    icon: Zap,
    title: "Investigate an energy consumption variance",
    tower: "Utilities",
    flow: "Meter event → context → baseline state → change → significance",
    output: "Diagnosis + evidence-linked recommendation",
  },
  {
    id: "uc-scope3-intake",
    actor: "Supplier / logistics",
    icon: Truck,
    title: "Ingest a shipment and close Scope 3A exposure",
    tower: "Supply Chain",
    flow: "Logistics event → validation → canonical variable → KPI",
    output: "Scope 3A figure with full provenance",
  },
  {
    id: "uc-compute-rightsize",
    actor: "Platform engineer",
    icon: Cpu,
    title: "Right-size a workload to cut compute cost & e-waste",
    tower: "Compute Resources",
    flow: "Telemetry → scenario options → trade-offs → recommendation",
    output: "Costed scenario awaiting authority approval",
  },
  {
    id: "uc-approval-thread",
    actor: "Executive / authority",
    icon: ShieldCheck,
    title: "Approve an intervention through the decision thread",
    tower: "Governance",
    flow: "Recommendation → evidence → authority → decision",
    output: "Recorded, auditable decision on the ledger",
  },
  {
    id: "uc-assurance-pack",
    actor: "Assurance reviewer",
    icon: FileCheck2,
    title: "Assemble a BTR / SDG evidence pack",
    tower: "Assurance",
    flow: "KPI → evidence lineage → confidence score → report view",
    output: "Verifiable report + evidence appendix",
  },
  {
    id: "uc-community-signal",
    actor: "Community pod / DAO",
    icon: Users,
    title: "Raise a community signal that enters the loop",
    tower: "Experience",
    flow: "Submission → GIS view → NEXUS triage → routed action",
    output: "Tracked case with audit trail",
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
          <ArchitectureMap />
          {PHASES.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} />
          ))}
          <UseCaseLibrary />
          <TowerGrid />
          <AssurancePanels />
          <PageFooter />
        </main>
      </div>
    </div>
  );
}

function ArchitectureMap() {
  return (
    <section id="architecture" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-3">
      <section className="e3-card e3-glass p-5 sm:p-6">
        <div className="e3-mono text-[10px] tracking-[0.28em] text-sky-400">
          PLATFORM ARCHITECTURE · V4.0 WIREFRAME
        </div>
        <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
          ELAS-3-CITY — layered platform architecture
        </h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-slate-400">
          Conceptual view for implementation discussion; the approved V4.0 controlled baseline
          remains authoritative. Each layer below maps to the wireframe band it represents.
        </p>
      </section>

      {WIRE_LAYERS.map((layer) => (
        <section key={layer.id} id={layer.id} className="e3-card e3-glass scroll-mt-20 p-5">
          <span className={`e3-mono text-[10px] uppercase tracking-[0.2em] ${layer.color}`}>
            {layer.eyebrow}
          </span>
          <h3 className="mt-1 text-[17px] font-medium text-slate-100">{layer.title}</h3>
          <p className="mt-1 max-w-3xl text-[12px] leading-relaxed text-slate-400">{layer.intro}</p>
          <div
            className={`mt-4 grid gap-3 ${
              layer.groups.length <= 2
                ? "grid-cols-1 sm:grid-cols-2"
                : layer.groups.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {layer.groups.map((group) => {
              const GroupIcon = group.icon;
              const chip = PILLAR_COLOR[group.color];
              return (
                <div
                  key={group.name}
                  className="e3-glass-subtle rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border ${chip}`}
                    >
                      <GroupIcon className="h-4 w-4" />
                    </span>
                    <span className="text-[12.5px] font-semibold text-slate-200">{group.name}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={item.label} className="flex items-start gap-2">
                          <ItemIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                          <div className="min-w-0">
                            <div className="text-[12px] font-medium text-slate-300">
                              {item.label}
                            </div>
                            <div className="text-[11px] leading-relaxed text-slate-500">
                              {item.note}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section id="controls" className="e3-card e3-glass scroll-mt-20 border-sky-400/20 p-5">
        <div className="e3-mono text-[10px] uppercase tracking-[0.2em] text-sky-400">
          Cross-cutting controls
        </div>
        <h3 className="mt-1 text-[17px] font-medium text-slate-100">Applied across every layer</h3>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROL_LIST.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex items-start gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2.5"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-slate-200">{c.label}</div>
                  <div className="text-[11px] leading-relaxed text-slate-500">{c.note}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="e3-mono mt-4 text-[10px] leading-relaxed text-slate-500">
          Principles: modular boundaries · interoperable APIs · traceable data lineage ·
          evidence-first measurement · security by design · resilient operations.
        </p>
      </section>
    </section>
  );
}

function UseCaseLibrary() {
  return (
    <section id="use-cases" className="mx-auto mt-10 max-w-6xl scroll-mt-20 space-y-4">
      <header>
        <div className="e3-mono text-[10px] tracking-[0.28em] text-slate-500">USE CASES · UC</div>
        <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
          Use-case library across the stack
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Each use case walks the wireframe flow — from an external event, through the governed
          decision thread, to an evidence-linked output. NEXUS recommends; authority decides.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {USE_CASES.map((uc) => {
          const Icon = uc.icon;
          return (
            <div key={uc.id} id={uc.id} className="e3-card e3-glass scroll-mt-20 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-sky-400/30 bg-sky-400/10 text-sky-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="e3-mono text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {uc.tower}
                </span>
              </div>
              <div className="mt-2 text-[13px] font-semibold leading-snug text-slate-100">
                {uc.title}
              </div>
              <div className="e3-mono mt-1 text-[10px] text-slate-500">Actor: {uc.actor}</div>
              <div className="mt-3 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                <div className="e3-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
                  Flow
                </div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-300">{uc.flow}</p>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-[11.5px] text-emerald-300">{uc.output}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
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
          <span className="text-sm font-bold uppercase tracking-wide text-slate-100">
            Elas3City
          </span>
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
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className={`h-7 w-full ${className ?? ""}`}
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
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
          NEXUS orchestration and the 20-iteration workflow loop. Architecture locks preserved under
          R1_BASELINE.
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
        <GlassMetric
          label="Architecture locks"
          value="953"
          sub="Section 2245"
          trend={[948, 950, 951, 953]}
        />
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
          Pilot data feeds, CRT traceability and ETF reporting readiness. Populated from the R1
          handover workbooks; live Supabase tables land here next.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <GlassMetric
          label="Pilot readiness"
          value="78%"
          sub="Target 100%"
          trend={[40, 55, 68, 78]}
        />
        <GlassMetric
          label="Data sources mapped"
          value="34"
          sub="Target 41"
          trend={[12, 20, 28, 34]}
        />
        <GlassMetric
          label="CRT traceability"
          value="91%"
          sub="Target 100%"
          trend={[60, 74, 84, 91]}
        />
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
  {
    id: "tower-executive",
    name: "Executive",
    question: "Are we on track, and what needs a decision today?",
  },
  {
    id: "tower-supply",
    name: "Supply Chain",
    question: "Where is value leaking, and which intervention pays back fastest?",
  },
  {
    id: "tower-utilities",
    name: "Utilities",
    question: "Energy and water flows — variance vs baseline?",
  },
  {
    id: "tower-water",
    name: "Water & Compute",
    question: "Is compute keeping up with MRV ingestion?",
  },
  {
    id: "tower-climate",
    name: "Climate / Nature",
    question: "GHG Scope 3 and ecosystem-service tracking — credible?",
  },
  {
    id: "tower-risk",
    name: "Risk / Resilience",
    question: "What could break the pilot, and is it mitigated?",
  },
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
          <GlassMetric
            label="BTR records verified"
            value="1,208"
            sub="Target 1,400"
            trend={[600, 840, 1020, 1208]}
          />
          <GlassMetric
            label="QA/QC pass rate"
            value="96%"
            sub="Target 98%"
            trend={[90, 92, 94, 96]}
          />
          <GlassMetric
            label="Ingestion lag"
            value="42s"
            sub="Target <60s"
            trend={[120, 90, 61, 42]}
          />
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
          <GlassMetric
            label="Named recipients"
            value="12"
            sub="NDA-signed"
            trend={[4, 7, 10, 12]}
          />
          <GlassMetric
            label="Institutional partners"
            value="6"
            sub="Barbados ecosystem"
            trend={[2, 3, 5, 6]}
          />
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
