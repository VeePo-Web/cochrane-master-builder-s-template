/**
 * /brand — Internal brand-kit surface.
 *
 * Exposes the canonical brand contract to anyone who needs it: contractors,
 * journalists, partners, fabrication vendors, future AI agents. Direct URL
 * only — never linked from public nav.
 *
 * Renders:
 *  - The brand bible's core rules (colors, sizes, clear-space, don'ts)
 *  - The 5 in-context showcase boards (with download links)
 *  - The full lockup family across all 3 colorways
 *  - The emblem, tiles, monogram, wordmark, wordmark-ground families
 *  - The social share / OG / profile pack
 *  - PWA + favicon icon ladder reference
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  MASTER_BOARDS,
  MASTER_BOARDS_META,
  MASTER_LOGOS,
  type MasterBoardId,
} from "@/master/brand/logo-registry";
import { SHARE_PACK, type SharePlatform } from "@/master/brand/share-pack";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

type SwatchTone = "navy" | "white" | "black";

const COLOR_SWATCHES: { tone: SwatchTone; label: string; hex: string; hsl: string; bg: string; ink: string; usage: string }[] = [
  {
    tone: "navy",
    label: "Navy (primary)",
    hex: "#1F2F4D",
    hsl: "218° 43% 21%",
    bg: "bg-[#1F2F4D]",
    ink: "text-white",
    usage: "Default. White / light backgrounds.",
  },
  {
    tone: "white",
    label: "White",
    hex: "#FFFFFF",
    hsl: "0° 0% 100%",
    bg: "bg-white border border-zinc-300",
    ink: "text-zinc-900",
    usage: "On navy, black, photographs, dark backgrounds.",
  },
  {
    tone: "black",
    label: "Black",
    hex: "#000000",
    hsl: "0° 0% 0%",
    bg: "bg-black",
    ink: "text-white",
    usage: "Single-color print, embossing, blueprints.",
  },
];

const DONTS = [
  "Don't recolor outside the navy / white / black palette.",
  "Don't apply drop shadows, gradients, strokes, or filters.",
  "Don't stretch, skew, or rotate.",
  "Don't reproduce on busy / photographic backgrounds without a navy or white panel behind the mark.",
  "Don't reconstruct or substitute fonts in the wordmark.",
  "Don't use the lockup smaller than 150 px wide — switch to the emblem.",
  "Don't use the monogram for nav, hero, or splash. It's a signature, not a brand mark.",
];

const Section = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-zinc-800 py-16">
    <div className="mx-auto max-w-7xl px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl text-white md:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const downloadBoard = (id: MasterBoardId) => {
  const url = MASTER_BOARDS[id];
  const a = document.createElement("a");
  a.href = url;
  a.download = `cmb-board-${id}.png`;
  a.click();
};

const Brand = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Brand Kit — Cochrane Master Builders</title>
        <meta name="description" content="The canonical brand bible for Cochrane Master Builders: marks, colors, sizes, clear space, and downloadable showcase boards." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Hero */}
        <header className="border-b border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              Brand bible · Internal
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
              Cochrane<br />Master Builders
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-zinc-400">
              The canonical brand contract. Marks, colors, sizing, clear space, file naming, do's
              and don'ts. If a rule is contested, this page wins.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-zinc-500">
              Brand color: <span className="font-mono text-zinc-300">#1F2F4D</span> · Source of
              truth: <span className="font-mono text-zinc-300">src/master/brand/BRAND_BIBLE.md</span>
            </p>
          </div>
        </header>

        {/* Showcase boards */}
        <Section eyebrow="01 · Showcase" title="The mark in context">
          <p className="mb-10 max-w-2xl text-zinc-400">
            High-resolution demonstration boards for press, partners, and fabrication vendors.
            Click any board to download the full-resolution PNG.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(MASTER_BOARDS) as MasterBoardId[]).map((id) => {
              const meta = MASTER_BOARDS_META[id];
              return (
                <figure
                  key={id}
                  className="group overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950"
                >
                  <div className="aspect-square overflow-hidden bg-zinc-900">
                    <img
                      src={MASTER_BOARDS[id]}
                      alt={`Cochrane Master Builders ${meta.label}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-zinc-800 p-4">
                    <div>
                      <p className="font-serif text-base text-white">{meta.label}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                        {meta.family} · {meta.surface}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadBoard(id)}
                      className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <Download className="mr-2 h-3.5 w-3.5" />
                      PNG
                    </Button>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Section>

        {/* Color */}
        <Section eyebrow="02 · Color" title="Three colorways. Navy is primary.">
          <div className="grid gap-6 md:grid-cols-3">
            {COLOR_SWATCHES.map((s) => (
              <div key={s.tone} className="overflow-hidden rounded-sm border border-zinc-800">
                <div className={`flex aspect-[4/3] items-end p-6 ${s.bg}`}>
                  <p className={`font-serif text-2xl ${s.ink}`}>{s.label}</p>
                </div>
                <div className="space-y-2 border-t border-zinc-800 bg-zinc-950 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                      HEX
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(s.hex)}
                      className="font-mono text-sm text-white hover:text-zinc-400"
                    >
                      {s.hex}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                      HSL
                    </span>
                    <span className="font-mono text-sm text-zinc-300">{s.hsl}</span>
                  </div>
                  <p className="pt-2 text-sm text-zinc-400">{s.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Lockup family */}
        <Section eyebrow="03 · Lockup" title="Full lockup — three colorways">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-sm border border-zinc-800 bg-white p-12">
              <img src={MASTER_LOGOS.navy.medium} alt="Navy lockup on white" className="mx-auto h-40 w-auto object-contain" />
              <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider text-zinc-500">Navy on light</p>
            </div>
            <div className="rounded-sm border border-zinc-800 bg-[#1F2F4D] p-12">
              <img src={MASTER_LOGOS.white.medium} alt="White lockup on navy" className="mx-auto h-40 w-auto object-contain" />
              <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider text-zinc-300">White on navy</p>
            </div>
            <div className="rounded-sm border border-zinc-800 bg-black p-12">
              <img src={MASTER_LOGOS.white.medium} alt="White lockup on black" className="mx-auto h-40 w-auto object-contain" />
              <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider text-zinc-300">White on black</p>
            </div>
          </div>
        </Section>

        {/* Mark families */}
        <Section eyebrow="04 · Families" title="Six derivative marks">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Emblem", desc: "Square 1:1. Favicon, profile pics, watermarks.", src: MASTER_LOGOS.navy.emblem[400], bg: "bg-white" },
              { label: "Tiles", desc: "Kinetic identity. Pattern fills, animated assembly.", src: MASTER_LOGOS.navy.tiles[400], bg: "bg-white" },
              { label: "MB Monogram", desc: "Signature. Email footers, certificates.", src: MASTER_LOGOS.navy.monogram[256], bg: "bg-white" },
              { label: "Wordmark", desc: "Editorial type voice. Section eyebrows, doc headers.", src: MASTER_LOGOS.navy.wordmark[800], bg: "bg-white" },
              { label: "Wordmark · Ground", desc: "Spec-grade. Chapter openers, deck covers, plates.", src: MASTER_LOGOS.navy.wordmarkGround[800], bg: "bg-white" },
              { label: "Lockup · Small", desc: "The default brand mark. Nav, footer, hero.", src: MASTER_LOGOS.navy.small, bg: "bg-white" },
            ].map((item) => (
              <div key={item.label} className="rounded-sm border border-zinc-800 bg-zinc-950">
                <div className={`flex aspect-[4/3] items-center justify-center p-10 ${item.bg}`}>
                  <img src={item.src} alt={item.label} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="border-t border-zinc-800 p-4">
                  <p className="font-serif text-lg text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Social share pack */}
        <Section eyebrow="05 · Social" title="Share pack — 5 platforms × 2 backgrounds">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(SHARE_PACK) as SharePlatform[]).map((platform) => {
              const asset = SHARE_PACK[platform];
              return (
                <div key={platform} className="rounded-sm border border-zinc-800 bg-zinc-950">
                  <div className="overflow-hidden bg-[#1F2F4D]">
                    <img
                      src={asset.navybg}
                      alt={`${platform} share asset`}
                      loading="lazy"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-zinc-800 p-4">
                    <div>
                      <p className="font-serif text-base capitalize text-white">{platform}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                        {asset.w} × {asset.h}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={asset.navybg}
                        download
                        className="inline-flex items-center gap-1 rounded-sm border border-zinc-700 px-2 py-1 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      >
                        <Download className="h-3 w-3" /> Navy
                      </a>
                      <a
                        href={asset.transparent}
                        download
                        className="inline-flex items-center gap-1 rounded-sm border border-zinc-700 px-2 py-1 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      >
                        <Download className="h-3 w-3" /> PNG
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Clear space + min size */}
        <Section eyebrow="06 · Clear space" title="Maintain breathing room">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-sm border border-zinc-800 bg-white p-8">
              <div className="relative">
                <div className="absolute inset-0 border-2 border-dashed border-[#1F2F4D]/20" />
                <div className="p-12">
                  <img src={MASTER_LOGOS.navy.medium} alt="Clear space demonstration" className="mx-auto h-32 w-auto object-contain" />
                </div>
              </div>
              <p className="mt-6 font-serif text-base text-zinc-900">Clear space</p>
              <p className="mt-2 text-sm text-zinc-600">
                Maintain padding equal to the height of the &ldquo;M&rdquo; in MASTER on all sides
                of the full lockup. Never crop into this margin.
              </p>
            </div>
            <div className="rounded-sm border border-zinc-800 bg-white p-8">
              <div className="flex items-end gap-6 p-12">
                <div className="text-center">
                  <img src={MASTER_LOGOS.navy.small} alt="Minimum lockup size" style={{ width: 150 }} className="h-auto" />
                  <p className="mt-3 font-mono text-xs uppercase tracking-wider text-zinc-500">150 px min · lockup</p>
                </div>
                <div className="text-center">
                  <img src={MASTER_LOGOS.navy.emblem[100]} alt="Minimum emblem size" style={{ width: 32, height: 32 }} />
                  <p className="mt-3 font-mono text-xs uppercase tracking-wider text-zinc-500">32 px min · emblem</p>
                </div>
              </div>
              <p className="mt-6 font-serif text-base text-zinc-900">Minimum size</p>
              <p className="mt-2 text-sm text-zinc-600">
                Below 150 px wide, switch from the lockup to the emblem. Below 32 px square, the
                mark is unreadable — use the favicon ladder instead.
              </p>
            </div>
          </div>
        </Section>

        {/* Don'ts */}
        <Section eyebrow="07 · Don'ts" title="Never do this">
          <div className="grid gap-3 md:grid-cols-2">
            {DONTS.map((rule) => (
              <div key={rule} className="flex items-start gap-3 rounded-sm border border-zinc-800 bg-zinc-950 p-4">
                <span aria-hidden className="mt-0.5 font-mono text-base text-red-400">✕</span>
                <p className="text-sm text-zinc-300">{rule}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Cross-references · for engineers + agents
            </p>
            <ul className="mt-4 space-y-2 font-mono text-sm text-zinc-400">
              <li>
                <span className="text-zinc-600">Bible:</span>{" "}
                <code className="text-white">src/master/brand/BRAND_BIBLE.md</code>
              </li>
              <li>
                <span className="text-zinc-600">Slot map:</span>{" "}
                <code className="text-white">src/master/brand/LOGO_SLOT_MAP.md</code>
              </li>
              <li>
                <span className="text-zinc-600">Component:</span>{" "}
                <code className="text-white">{"<MasterLogo slot=\"...\" />"}</code>
              </li>
              <li>
                <span className="text-zinc-600">Share pack:</span>{" "}
                <code className="text-white">{"getShareAsset(\"og\")"}</code>
              </li>
              <li>
                <span className="text-zinc-600">Source archive:</span>{" "}
                <code className="text-white">src/master/assets/logo/source/</code>
              </li>
            </ul>
            <a
              href="/"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white"
            >
              <ExternalLink className="h-3 w-3" /> Back to public site
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Brand;
