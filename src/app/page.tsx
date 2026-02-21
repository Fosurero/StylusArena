import Link from "next/link";
import { templates } from "@/lib/templates";

export default function Home() {
  return (
    <div className="relative noise-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[hsl(213,94%,55%)] opacity-[0.04] blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[hsl(280,70%,55%)] opacity-[0.05] blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[hsl(160,80%,42%)] opacity-[0.03] blur-[80px] animate-float" style={{ animationDelay: "4s" }} />

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(213,94%,55%) 1px, transparent 1px), linear-gradient(90deg, hsl(213,94%,55%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background))]/50 to-[hsl(var(--background))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass text-sm mb-10 animate-float" style={{ animationDuration: "8s" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-[hsl(var(--muted-foreground))] font-medium">
                The 30-second on-ramp for external devs to try Arbitrum Stylus
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              No install. No setup.
              <br />
              <span className="gradient-text">
                Deploy Rust contracts
              </span>
              <br />
              <span className="text-[hsl(var(--foreground))]">+ see </span>
              <span className="text-emerald-400 relative">
                60% gas savings
                <span className="absolute -bottom-1 left-0 right-0 h-1 gradient-primary rounded-full opacity-50" />
              </span>
              <br />
              <span className="text-[hsl(var(--muted-foreground))] text-4xl sm:text-5xl lg:text-6xl font-bold">
                vs Solidity in seconds.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-12 leading-relaxed">
              Not a full IDE like Wizard v2. This is the{" "}
              <strong className="text-[hsl(var(--foreground))] font-semibold">
                quick playground
              </strong>{" "}
              for Solana Rust devs and Web2 engineers who want to try before
              committing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/playground"
                className="group relative px-10 py-5 rounded-2xl text-white font-bold text-lg overflow-hidden
                         transition-all hover:scale-105 active:scale-100 glow-blue shadow-2xl"
              >
                <span className="absolute inset-0 gradient-primary" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(213, 94%, 60%) 0%, hsl(280, 70%, 60%) 50%, hsl(160, 80%, 47%) 100%)" }}
                />
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Try Now — No Setup Required
                </span>
              </Link>
              <a
                href="#gas-preview"
                className="px-10 py-5 rounded-2xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))]
                         font-semibold text-lg hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--muted-foreground))]/30 transition-all"
              >
                See Gas Savings ↓
              </a>
            </div>

            {/* Social proof */}
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Built as lightweight on-ramp — complementing{" "}
              <a
                href="https://wizard.stylus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--primary))] hover:underline font-medium"
              >
                Wizard v2
              </a>{" "}
              full IDE
            </p>
          </div>
        </div>
      </section>

      {/* Gas Preview Section */}
      <section id="gas-preview" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-4 block">
              Performance
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Real Gas Savings.{" "}
              <span className="gradient-text">Real Numbers.</span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
              Stylus compiles Rust to WASM and runs alongside EVM on Arbitrum.
              Same security, same composability — dramatically less gas.
            </p>
          </div>

          {/* Gas comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass glass-hover rounded-2xl p-10 text-center transition-all hover:scale-[1.02] glow-green">
              <p className="text-7xl font-black text-emerald-400 mb-3 tracking-tighter">60<span className="text-4xl">%</span></p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                avg. gas savings on storage ops
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-10 text-center transition-all hover:scale-[1.02] glow-purple">
              <p className="text-7xl font-black gradient-text mb-3 tracking-tighter">88<span className="text-4xl">%</span></p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                savings on compute-heavy (Fibonacci)
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-10 text-center transition-all hover:scale-[1.02] glow-blue">
              <p className="text-7xl font-black text-[hsl(var(--primary))] mb-3 tracking-tighter">5</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                templates ready to deploy in seconds
              </p>
            </div>
          </div>

          {/* Template preview grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((t) => {
              const savings = Math.round(
                ((t.gasEvm - t.gasStylus) / t.gasEvm) * 100
              );
              return (
                <Link
                  key={t.id}
                  href={`/playground?template=${t.id}`}
                  className="glass glass-hover rounded-xl p-6 border border-transparent transition-all group hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${t.badgeColor}`}
                    >
                      {t.badge}
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      -{savings}%
                    </span>
                  </div>
                  <h3 className="font-bold mb-1 group-hover:gradient-text transition-colors text-lg">
                    {t.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3 font-medium">
                    {t.subtitle}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))] font-mono">
                    <span>
                      Stylus:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {t.gasStylus.toLocaleString()}
                      </span>
                    </span>
                    <span>
                      EVM:{" "}
                      <span className="text-[hsl(var(--primary))] font-semibold">
                        {t.gasEvm.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
              How it Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              From Zero to Deploy in{" "}
              <span className="gradient-text">30 Seconds</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick a Template",
                desc: "Choose from 5 templates designed for Solana devs, Solidity migrators, and Web2 engineers.",
                gradient: "from-blue-500/20 to-purple-500/20",
              },
              {
                step: "02",
                title: "Edit & Compare",
                desc: "Monaco-powered editor with Rust syntax. See the Solidity equivalent and gas comparison side by side.",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                step: "03",
                title: "Deploy to Sepolia",
                desc: "Connect wallet, deploy to Arbitrum Sepolia, and interact — all from the browser.",
                gradient: "from-emerald-500/20 to-cyan-500/20",
              },
            ].map((item) => (
              <div key={item.step} className={`glass glass-hover rounded-2xl p-8 transition-all hover:scale-[1.02]`}>
                <span className="text-5xl font-black gradient-text opacity-40 block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 border-t border-[hsl(var(--border))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-4 block">
              Positioning
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              StylusArena vs{" "}
              <span className="text-[hsl(var(--primary))]">Wizard v2</span>
            </h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden border border-[hsl(var(--border))]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                  <th className="text-left p-5 text-[hsl(var(--muted-foreground))] font-semibold uppercase text-xs tracking-wider">
                    Feature
                  </th>
                  <th className="text-center p-5 font-bold">
                    <span className="gradient-text">StylusArena</span>
                  </th>
                  <th className="text-center p-5 text-[hsl(var(--primary))] font-bold">
                    Wizard v2
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {[
                  ["Purpose", "Quick try → first deploy", "Full development IDE"],
                  ["Setup time", "0 seconds", "Minutes (account + config)"],
                  ["Target user", "Curious external devs", "Committed Stylus devs"],
                  ["Gas comparison", "Hero feature, visual", "Available"],
                  ["Templates", "5 curated, audience-tagged", "Extensive library"],
                  ["Compilation", "Demo flow + CLI guide", "Full in-browser"],
                  ["Best for", "\"Should I try Stylus?\"", "\"I'm building on Stylus\""],
                ].map(([feature, arena, wizard]) => (
                  <tr key={feature} className="hover:bg-[hsl(var(--muted))]/30 transition-colors">
                    <td className="p-5 font-semibold">{feature}</td>
                    <td className="p-5 text-center text-[hsl(var(--muted-foreground))]">
                      {arena}
                    </td>
                    <td className="p-5 text-center text-[hsl(var(--muted-foreground))]">
                      {wizard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-8 font-medium">
            StylusArena is the <span className="text-[hsl(var(--foreground))]">front door</span>. 
            Wizard v2 is the <span className="text-[hsl(var(--foreground))]">workshop</span>. They complement each other.
          </p>
        </div>
      </section>

      {/* Milestone / Grant Progress */}
      <section className="py-24 border-t border-[hsl(var(--border))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
              Grant Progress
            </span>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Building in the Open
            </h2>
            <p className="text-[hsl(var(--muted-foreground))]">
              Track our progress through the Arbitrum Stylus grant milestones
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                milestone: "Milestone 1",
                title: "MVP Launch — Playground + Gas Dashboard",
                amount: "$3,700",
                status: "current",
                items: ["Landing page with Try Now CTA", "Monaco editor with 5 templates", "Gas comparison dashboard", "Wallet connect + Sepolia deploy flow"],
              },
              {
                milestone: "Milestone 2",
                title: "Full Compilation + Enhanced Deploy",
                amount: "$3,700",
                status: "upcoming",
                items: ["In-browser Rust → WASM compilation", "Real contract deployment to Sepolia", "Transaction history & verification", "Shareable playground links"],
              },
              {
                milestone: "Milestone 3",
                title: "Community + Analytics",
                amount: "$3,600",
                status: "upcoming",
                items: ["User analytics dashboard", "Community template submissions", "Gas benchmarking suite", "Documentation & tutorials"],
              },
            ].map((m) => (
              <div
                key={m.milestone}
                className={`glass rounded-xl p-6 border transition-all ${
                  m.status === "current"
                    ? "border-emerald-500/40 glow-green"
                    : "border-[hsl(var(--border))] opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      m.status === "current"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]"
                    }`}>
                      {m.status === "current" ? "In Progress" : "Upcoming"}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{m.milestone}</span>
                  </div>
                  <span className="text-sm font-bold font-mono gradient-text">{m.amount}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {m.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        m.status === "current" ? "bg-emerald-400" : "bg-[hsl(var(--muted-foreground))]"
                      }`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(213,94%,55%)] opacity-[0.03] blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
            Ready to see the{" "}
            <span className="gradient-text">gas savings</span>?
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] mb-10 leading-relaxed">
            Pick a template, edit the code, compare gas costs — all in your
            browser. No install, no CLI, no accounts.
          </p>
          <Link
            href="/playground"
            className="group relative inline-flex px-12 py-6 rounded-2xl text-white font-bold text-xl overflow-hidden
                     transition-all hover:scale-105 active:scale-100 glow-blue shadow-2xl"
          >
            <span className="absolute inset-0 gradient-primary" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, hsl(213, 94%, 60%) 0%, hsl(280, 70%, 60%) 50%, hsl(160, 80%, 47%) 100%)" }}
            />
            <span className="relative flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Try Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
