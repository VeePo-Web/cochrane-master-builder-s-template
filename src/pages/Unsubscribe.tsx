import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LogoMark from "@/components/detailing/LogoMark";
import { setPageMeta } from "@/lib/seo";

type ViewState =
  | { kind: "validating" }
  | { kind: "ready" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "already" }
  | { kind: "error"; message: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<ViewState>({ kind: "validating" });

  useEffect(() => {
    setPageMeta({
      title: "Unsubscribe — Cochrane Master Builders",
      description: "Manage your email preferences from Cochrane Master Builders.",
      path: "/unsubscribe",
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setState({ kind: "error", message: "Missing unsubscribe token." });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setState({
            kind: "error",
            message: data?.error || "This unsubscribe link is invalid or expired.",
          });
          return;
        }
        if (data?.valid === false && data?.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        setState({ kind: "ready" });
      } catch {
        if (!cancelled) {
          setState({
            kind: "error",
            message: "We couldn't verify this link. Please try again later.",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirmUnsubscribe = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-email-unsubscribe",
        { body: { token } },
      );
      if (error) {
        setState({
          kind: "error",
          message: "Something went wrong. Please try again.",
        });
        return;
      }
      if (data?.success) {
        setState({ kind: "success" });
      } else if (data?.reason === "already_unsubscribed") {
        setState({ kind: "already" });
      } else {
        setState({
          kind: "error",
          message: data?.error || "Unable to process unsubscribe.",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-asphalt text-foreground flex flex-col">
      {/* Top brand strip */}
      <header className="px-8 pt-10 pb-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <LogoMark size={32} className="text-copper" />
          <span className="font-display text-display-sm tracking-[0.06em]">
            Cochrane Master Builders
          </span>
        </Link>
        <Link
          to="/"
          className="font-overline text-caption tracking-[0.25em] uppercase text-muted-foreground/60 hover:text-copper transition-colors"
        >
          ← Back to site
        </Link>
      </header>

      {/* Copper rule */}
      <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent" />

      {/* Card */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="w-full max-w-xl"
        >
          <p className="font-overline text-caption tracking-[0.25em] uppercase text-copper mb-6 text-center">
            Email Preferences
          </p>

          {state.kind === "validating" && (
            <Centered>
              <Loader2 className="text-copper animate-spin" size={28} strokeWidth={1.5} />
              <Heading>Checking your link…</Heading>
              <Body>One moment while we confirm this unsubscribe request.</Body>
            </Centered>
          )}

          {state.kind === "ready" && (
            <Centered>
              <Heading>Unsubscribe from Cochrane Master Builders?</Heading>
              <Body>
                You'll stop receiving booking confirmations and service updates
                from us. You can still book again anytime — we just won't email
                you afterward.
              </Body>
              <button
                onClick={confirmUnsubscribe}
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Confirm Unsubscribe
              </button>
              <Link
                to="/"
                className="mt-6 text-body-sm text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                Never mind, take me back
              </Link>
            </Centered>
          )}

          {state.kind === "submitting" && (
            <Centered>
              <Loader2 className="text-copper animate-spin" size={28} strokeWidth={1.5} />
              <Heading>Processing…</Heading>
            </Centered>
          )}

          {state.kind === "success" && (
            <Centered>
              <div className="w-12 h-12 rounded-full border border-copper/40 flex items-center justify-center">
                <Check className="text-copper" size={22} strokeWidth={1.5} />
              </div>
              <Heading>You've been unsubscribed.</Heading>
              <Body>
                We won't send you any more emails. If this was a mistake, just
                book again and confirmations will resume.
              </Body>
              <Link
                to="/"
                className="mt-8 font-overline text-caption tracking-[0.25em] uppercase text-copper hover:text-copper-glow transition-colors"
              >
                Return to site →
              </Link>
            </Centered>
          )}

          {state.kind === "already" && (
            <Centered>
              <Heading>Already unsubscribed.</Heading>
              <Body>
                This email address has already been removed from our list. No
                further action needed.
              </Body>
              <Link
                to="/"
                className="mt-8 font-overline text-caption tracking-[0.25em] uppercase text-copper hover:text-copper-glow transition-colors"
              >
                Return to site →
              </Link>
            </Centered>
          )}

          {state.kind === "error" && (
            <Centered>
              <div className="w-12 h-12 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                <AlertCircle className="text-muted-foreground" size={22} strokeWidth={1.5} />
              </div>
              <Heading>Something's not right.</Heading>
              <Body>{state.message}</Body>
              <Link
                to="/"
                className="mt-8 font-overline text-caption tracking-[0.25em] uppercase text-copper hover:text-copper-glow transition-colors"
              >
                Return to site →
              </Link>
            </Centered>
          )}
        </motion.div>
      </section>

      <footer className="px-8 py-10 text-center">
        <p className="font-overline text-caption tracking-[0.25em] uppercase text-muted-foreground/40">
          Calgary · Airdrie · Cochrane
        </p>
      </footer>
    </main>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center text-center gap-4">{children}</div>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-display text-display-md text-foreground leading-tight">
    {children}
  </h1>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="text-body text-muted-foreground/80 leading-relaxed max-w-md">
    {children}
  </p>
);

export default Unsubscribe;
