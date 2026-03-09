"use client";

interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
  tag: "feature" | "improvement" | "milestone";
}

const changelog: ChangelogEntry[] = [
  {
    date: "2026-03-09",
    title: "Community Traction Dashboard",
    description:
      "Added live usage counters showing playground sessions, templates explored, and wallets connected.",
    tag: "feature",
  },
  {
    date: "2026-03-07",
    title: "Codebase Cleanup & Optimization",
    description:
      "Removed unused dependencies, optimized component structure, and improved overall bundle size.",
    tag: "improvement",
  },
  {
    date: "2026-03-05",
    title: "Contract Source Files Added",
    description:
      "Published Rust and Solidity source files for all 5 templates under contracts/ directory.",
    tag: "feature",
  },
  {
    date: "2026-03-03",
    title: "Wallet UX Improvements",
    description:
      "Enhanced wallet picker with auto-detect, network warning badges, and smoother connection flow.",
    tag: "improvement",
  },
  {
    date: "2026-03-01",
    title: "MVP Launch — Milestone 1",
    description:
      "Shipped the full playground with 5 templates, Monaco editor, gas dashboard, and deploy guidance for Arbitrum Sepolia.",
    tag: "milestone",
  },
  {
    date: "2026-02-26",
    title: "Gas Comparison Dashboard",
    description:
      "Visual gas comparison bars with animated counters for all 5 templates—Stylus vs EVM side by side.",
    tag: "feature",
  },
  {
    date: "2026-02-22",
    title: "Template System & Dual Editor",
    description:
      "5 curated templates with audience tags (Solana devs, Solidity migration, Web2 friendly) and dual Rust/Solidity view.",
    tag: "feature",
  },
];

const tagStyles: Record<ChangelogEntry["tag"], { bg: string; text: string; label: string }> = {
  feature: {
    bg: "bg-emerald-500/15 border-emerald-500/30",
    text: "text-emerald-400",
    label: "Feature",
  },
  improvement: {
    bg: "bg-[hsl(var(--primary))]/15 border-[hsl(var(--primary))]/30",
    text: "text-[hsl(var(--primary))]",
    label: "Improvement",
  },
  milestone: {
    bg: "bg-[hsl(var(--accent))]/15 border-[hsl(var(--accent))]/30",
    text: "text-[hsl(var(--accent))]",
    label: "Milestone",
  },
};

export function Changelog() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-[hsl(var(--primary))]/30 to-transparent" />

      <div className="space-y-6">
        {changelog.map((entry, i) => {
          const style = tagStyles[entry.tag];
          return (
            <div key={i} className="relative pl-12 group">
              {/* Dot */}
              <span
                className={`absolute left-3 top-[22px] w-3 h-3 rounded-full border-2 transition-all ${
                  i === 0
                    ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_hsl(160,80%,42%,0.5)]"
                    : "bg-[hsl(var(--background))] border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))]"
                }`}
              />

              <div className="glass rounded-xl p-5 border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))]/30 transition-all">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${style.bg} ${style.text}`}
                  >
                    {style.label}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
                    {entry.date}
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-1">{entry.title}</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
