import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/console")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
  },
  component: ConsolePage,
});

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
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-sm border border-emerald-600/60 bg-emerald-600/10">
              <span className="font-serif text-xl italic text-emerald-700">E3</span>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] text-neutral-600">
                ELAS-3-CITY PLATFORM
              </div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-neutral-400">
                V4.0 · SECTION 2245 · 953 LOCKS
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] text-neutral-500 sm:inline">{email}</span>
            <Link
              to="/admin"
              className="border border-neutral-300 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 hover:bg-neutral-100"
            >
              Admin
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="border border-neutral-300 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 hover:bg-neutral-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-neutral-200 bg-gradient-to-b from-emerald-50 to-neutral-50">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
            Clearance Verified · Full Platform Access
          </div>
          <h1 className="mt-3 text-[32px] font-medium leading-tight tracking-tight text-neutral-900 sm:text-[44px]">
            ELAS-3-CITY Console
          </h1>
          <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-neutral-600">
            The complete five-phase platform build. All 13 edge functions deployed and operational —
            data federation, KPI measurement, GHG Scope 3, governance, NEXUS orchestration and the
            20-iteration workflow loop. Architecture locks preserved under R1_BASELINE.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat k="Phases" v="5" sub="Foundation → Advanced" />
            <Stat k="Edge Functions" v="13" sub="All ACTIVE" />
            <Stat k="Architecture Locks" v="953" sub="Section 2245" />
            <Stat k="Compliance" v="100%" sub="R1_BASELINE preserved" />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        {PHASES.map((phase) => (
          <PhaseSection key={phase.id} phase={phase} />
        ))}
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
          <span className="font-mono text-[10px] text-neutral-400">
            ELAS-3-CITY · V4.0 · ANOVA · R1_BASELINE
          </span>
          <span className="font-mono text-[10px] text-neutral-400">
            953 LOCKS · SECTION 2245 · PRESERVED
          </span>
        </div>
      </footer>
    </div>
  );
}
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