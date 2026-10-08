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
function Stat({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div className="border border-neutral-200 bg-white p-4">
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">{k}</div>
      <div className="mt-1 text-[24px] font-medium text-neutral-900">{v}</div>
      <div className="font-mono text-[9px] text-neutral-400">{sub}</div>
    </div>
  );
}

function PhaseSection({ phase }: { phase: (typeof PHASES)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="mb-6 border border-neutral-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-5 text-left hover:bg-neutral-50"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-emerald-600/50 bg-emerald-600/10 font-serif text-[16px] italic text-emerald-700">
          {phase.num}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[17px] font-medium text-neutral-900">{phase.title}</h2>
            <span className="rounded-sm bg-emerald-600/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-emerald-700">
              {phase.status}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{phase.desc}</p>
        </div>
        <span className="font-mono text-[10px] text-neutral-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-neutral-200 px-5 py-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
            Deployed Functions ({phase.functions.length})
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {phase.functions.map((fn) => (
              <a
                key={fn}
                href={`${import.meta.env.VITE_SUPABASE_URL ?? ""}/functions/v1/${fn}`}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between border border-neutral-200 px-3 py-2 font-mono text-[11px] text-neutral-700 hover:border-emerald-600/50 hover:bg-emerald-50/50"
              >
                <span>{fn}</span>
                <span className="text-[9px] text-neutral-400">invoke →</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
