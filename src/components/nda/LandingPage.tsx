import { Link } from "@tanstack/react-router";

/** Standalone NDA landing page for the /nda route. Presents the bi-lateral NDA notice and directs visitors to the main dossier flow, where the on-screen NDA signature form lives. */
export function NdaLandingPage() {
  return (
    <div className="e3-app min-h-screen flex flex-col items-center justify-center bg-[var(--e3-deep)]">
      <header className="e3-glass w-full max-w-[900px] border-b border-white/10 px-4 py-6 text-center">
        <div className="flex items-center gap-3 mx-auto">
          <div className="grid h-10 w-10 place-items-center rounded-lg e3-gradient e3-glow">
            <span className="text-[13px] font-bold text-[#05203a]">E3</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-wide text-slate-100">ELAS-3-CITY</div>
            <div className="e3-mono text-[9px] tracking-[0.18em] text-slate-500">PATRON STACK · NDA</div>
          </div>
        </div>
      </header>

      <main className="e3-glass w-full max-w-[900px] px-4 py-12">
        <div className="mb-8 text-center">
          <div className="e3-gradient p-3 rounded-xl inline-block mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#05203a]">CONFIDENTIAL</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#e2e8f0] tracking-tighter mb-3">
            Bi-Lateral Non-Disclosure Agreement
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Sections IV through X of the ELAS-3-CITY dossier — the Model, Platform Ecosystem, Value-Creation Framework, Ecosystem-Service Tracking, Financing, Governance and Roadmap — are bound by a bi-lateral non-disclosure agreement. To unlock the restricted sections and gain access to the ELAS-3-CITY platform, print and sign the NDA, or complete it on-screen from the main dossier page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl mx-auto">
          <div className="e3-card e3-glass border border-white/10 px-4 py-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Step 1</div>
            <div className="mt-1 text-[14px] font-medium text-slate-100">Review the dossier</div>
            <div className="mt-1 text-[12px] leading-relaxed text-slate-500">Read the public sections I–III on the main page.</div>
          </div>

          <div className="e3-card e3-glass border border-white/10 px-4 py-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Step 2</div>
            <div className="mt-1 text-[14px] font-medium text-slate-100">Sign the NDA</div>
            <div className="mt-1 text-[12px] leading-relaxed text-slate-500">Complete the on-screen signature form or print and sign.</div>
          </div>

          <div className="e3-card e3-glass border border-white/10 px-4 py-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Step 3</div>
            <div className="mt-1 text-[14px] font-medium text-slate-100">Enter the platform</div>
            <div className="mt-1 text-[12px] leading-relaxed text-slate-500">Unlock sections IV–X and the ELAS-3-CITY console.</div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 justify-center">
          <Link
            to="/"
            className="e3-btn e3-gradient px-8 py-3 text-[12px] uppercase tracking-[0.22em] text-white hover:opacity-90 transition-opacity"
          >
            Open the dossier & sign
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/auth"
            className="e3-btn e3-glass-subtle px-8 py-3 text-[12px] uppercase tracking-[0.22em] text-slate-300 hover:text-slate-100 border border-white/20"
          >
            Sign in to the platform
          </Link>
        </div>
      </main>

      <footer className="e3-glass w-full max-w-[900px] border-t border-white/10 px-4 py-6 text-center">
        <div className="text-[9px] font-medium uppercase tracking-widest text-slate-500">
          ELAS-3-CITY · V4.0 · ANOVA · R1_BASELINE
        </div>
        <div className="mt-1 text-[8px] text-slate-600">
          953 LOCKS · SECTION 2245 · PRESERVED
        </div>
      </footer>
    </div>
  );
}