import { Link } from "@tanstack/react-router";

/**
 * Standalone NDA landing page for the /nda route.
 * Presents the bi-lateral NDA notice and directs visitors to the
 * main dossier flow, where the on-screen NDA signature form lives.
 */
export function NdaLandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-sm border border-emerald-600/60 bg-emerald-600/10">
              <span className="font-serif text-xl italic text-emerald-700">E3</span>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] text-neutral-600">
                ELAS-3-CITY ⁄ ANOVA
              </div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-neutral-400">
                NON-DISCLOSURE AGREEMENT
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to dossier
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-4 py-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-700">
          Confidential · Named Recipients Only
        </div>
        <h1 className="mt-3 text-[30px] font-medium leading-tight tracking-tight text-neutral-900 sm:text-[38px]">
          Bi-Lateral Non-Disclosure Agreement
        </h1>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-neutral-600">
          Sections IV through X of the ELAS-3-CITY dossier — the Model, Platform Ecosystem,
          Value-Creation Framework, Ecosystem-Service Tracking, Financing, Governance and Roadmap —
          are bound by a bi-lateral non-disclosure agreement. To unlock the restricted sections and
          gain access to the ELAS-3-CITY platform, print and sign the NDA, or complete it on-screen
          from the main dossier page.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="border border-neutral-200 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
              Step 1
            </div>
            <div className="mt-1 text-[14px] font-medium text-neutral-900">
              Review the dossier
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-neutral-500">
              Read the public sections I–III on the main page.
            </div>
          </div>
          <div className="border border-neutral-200 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
              Step 2
            </div>
            <div className="mt-1 text-[14px] font-medium text-neutral-900">
              Sign the NDA
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-neutral-500">
              Complete the on-screen signature form or print and sign.
            </div>
          </div>
          <div className="border border-neutral-200 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
              Step 3
            </div>
            <div className="mt-1 text-[14px] font-medium text-neutral-900">
              Enter the platform
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-neutral-500">
              Unlock sections IV–X and the ELAS-3-CITY console.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-emerald-700 bg-emerald-700 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-white hover:bg-emerald-800"
          >
            Open the dossier & sign
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/auth"
            className="border border-neutral-300 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-neutral-600 hover:bg-neutral-100"
          >
            Sign in to the platform
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-3 px-4 py-6">
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

export default NdaLandingPage;