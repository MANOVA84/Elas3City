import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { email: hintedEmail } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(hintedEmail);

  useEffect(() => {
    if (hintedEmail) setEmail(hintedEmail);
  }, [hintedEmail]);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const normalizedEmail = email.trim().toLowerCase();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/console" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/console` },
        });
        if (error) throw error;
      }
      navigate({ to: "/console" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setErr(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/console` },
      });
      if (error) throw error;
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  async function sendMagicLink() {
    setErr(null);
    setLinkSent(false);
    if (!normalizedEmail) {
      setErr("Enter the email from your signed NDA first.");
      return;
    }
    setLinkBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { emailRedirectTo: `${window.location.origin}/console` },
      });
      if (error) throw error;
      setLinkSent(true);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not send sign-in link");
    } finally {
      setLinkBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-5 py-12">
      <div className="w-full max-w-sm border border-neutral-300 bg-white p-7 shadow-sm">
        <Link to="/" className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900">
          {"\u2190"} Back to document
        </Link>
        <h1 className="mt-4 text-[22px] font-medium tracking-tight text-neutral-900">
          Platform {mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="mt-1 text-[13px] text-neutral-500">
          Restricted access. ELAS-3-CITY platform console.
        </p>
        {hintedEmail && (
          <p className="mt-2 text-[12px] leading-relaxed text-neutral-600">
            Continuing as <span className="font-mono">{hintedEmail}</span> — use Google or the
            email link below{mode === "signin" ? ", or your console password," : ""} to enter
            the 5-phase build.
          </p>
        )}

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 border border-neutral-300 bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-800 hover:bg-neutral-50 disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.4 3.4 2.7h.3c2.1-2 3.8-4.9 3.8-8.9z" />
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.9 1.6-4.1 1.6-3.1 0-5.8-2.1-6.8-5l-.4.1-3.5 2.7v.4C3.3 21.5 7.3 24 12 24z" />
            <path fill="#FBBC05" d="M5.2 14.8c-.2-.7-.4-1.5-.4-2.8s.1-2.1.4-2.8l-.1-.4-3.5-2.7h-.4C.4 7.9 0 9.9 0 12s.4 4.1 1.2 5.9l4-3.1z" />
            <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.5 1.2 6.1l4 3.1c1-2.9 3.7-4.5 6.8-4.5z" />
          </svg>
          Continue with Google
        </button>

        <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          or
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-600">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-neutral-300 px-3 py-2 text-[14px] outline-none focus:border-neutral-900" />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-600">Password</span>
            <div className="relative mt-1">
              <input type={showPw ? "text" : "password"} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 pr-16 text-[14px] outline-none focus:border-neutral-900" />
              <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 px-3 text-[10px] uppercase tracking-[0.15em] text-neutral-500 hover:text-neutral-900">
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {err && <p className="text-[12px] text-red-700">{err}</p>}

          <button type="submit" disabled={busy} className="w-full bg-neutral-900 px-4 py-2.5 text-[13px] uppercase tracking-[0.18em] text-white hover:bg-neutral-700 disabled:opacity-50">
            {busy ? "..." : mode === "signin" ? "Sign In" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={sendMagicLink}
          disabled={linkBusy || !normalizedEmail}
          className="mt-3 w-full border border-neutral-300 bg-white px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
        >
          {linkBusy ? "Sending link…" : "Email me a sign-in link"}
        </button>
        {linkSent && (
          <p className="mt-2 text-[12px] leading-relaxed text-emerald-700">
            Check {normalizedEmail} — the link lands you straight in the 5-phase console. It
            expires in about an hour.
          </p>
        )}

        <p className="mt-6 text-center font-mono text-[10px] text-neutral-400 select-none">
          Instance: {(import.meta.env.VITE_SUPABASE_URL ?? "").replace("https://", "").split(".")[0] || "unknown"}
        </p>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-5 w-full text-[12px] text-neutral-500 hover:text-neutral-900">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
