"use client";

import { templates } from "@/lib/templates";

function GasBar({
  label,
  gas,
  max,
  color,
  animDelay,
}: {
  label: string;
  gas: number;
  max: number;
  color: string;
  animDelay?: string;
}) {
  const pct = (gas / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] w-14 text-right text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-7 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${pct}%`, transitionDelay: animDelay }}
        />
      </div>
      <span className="text-sm font-mono font-bold w-20 text-right tabular-nums">
        {gas.toLocaleString()}
      </span>
    </div>
  );
}

export function GasDashboard({
  selectedId,
}: {
  selectedId?: string;
}) {
  const selected = templates.find((t) => t.id === selectedId) || templates[0];
  const savings = Math.round(
    ((selected.gasEvm - selected.gasStylus) / selected.gasEvm) * 100
  );
  const maxGas = Math.max(
    ...templates.map((t) => Math.max(t.gasEvm, t.gasStylus))
  );

  return (
    <div id="gas" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass glass-hover rounded-2xl p-8 text-center glow-green transition-all hover:scale-[1.02]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3 font-bold">
            Stylus Gas
          </p>
          <p className="text-5xl font-black text-emerald-400 font-mono tabular-nums tracking-tighter">
            {selected.gasStylus.toLocaleString()}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 font-medium">
            WASM execution
          </p>
        </div>
        <div className="glass glass-hover rounded-2xl p-8 text-center glow-purple transition-all hover:scale-[1.02]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3 font-bold">
            Gas Savings
          </p>
          <p className="text-6xl font-black gradient-text font-mono tabular-nums tracking-tighter">
            {savings}%
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 font-medium">
            less gas with Stylus
          </p>
        </div>
        <div className="glass glass-hover rounded-2xl p-8 text-center glow-blue transition-all hover:scale-[1.02]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3 font-bold">
            EVM Gas
          </p>
          <p className="text-5xl font-black text-[hsl(var(--primary))] font-mono tabular-nums tracking-tighter">
            {selected.gasEvm.toLocaleString()}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 font-medium">
            Solidity equivalent
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-[hsl(var(--border))]">
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          All Templates — Gas Comparison
        </h3>
        <div className="space-y-3">
          {templates.map((t, idx) => {
            const s = Math.round(
              ((t.gasEvm - t.gasStylus) / t.gasEvm) * 100
            );
            return (
              <div
                key={t.id}
                className={`p-4 rounded-xl border transition-all ${
                  t.id === selected.id
                    ? "border-[hsl(var(--primary))]/50 bg-[hsl(var(--primary))]/5 glow-blue"
                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground))]/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${t.badgeColor}`}
                    >
                      {t.badge}
                    </span>
                    <span className="text-sm font-bold">{t.title}</span>
                  </div>
                  <span className="text-sm font-black text-emerald-400 font-mono">
                    -{s}%
                  </span>
                </div>
                <div className="space-y-1.5">
                  <GasBar
                    label="Stylus"
                    gas={t.gasStylus}
                    max={maxGas}
                    color="bg-gradient-to-r from-emerald-500 to-emerald-400"
                    animDelay={`${idx * 100}ms`}
                  />
                  <GasBar
                    label="EVM"
                    gas={t.gasEvm}
                    max={maxGas}
                    color="bg-gradient-to-r from-[hsl(213,94%,55%)] to-[hsl(280,70%,55%)]"
                    animDelay={`${idx * 100 + 50}ms`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-center text-[hsl(var(--muted-foreground))] leading-relaxed">
        Gas estimates based on Arbitrum Sepolia benchmarks. Compute-heavy
        contracts (Fibonacci) show the largest savings.
        <br />
        <span className="font-medium text-[hsl(var(--muted-foreground))]/70 italic">
          Built as lightweight on-ramp — complementing Wizard v2 full IDE
        </span>
      </p>
    </div>
  );
}
