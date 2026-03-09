import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 26 26" fill="none" className="text-[hsl(213,94%,55%)]" aria-hidden="true">
                <path d="M13 1.5 L23.5 7.5 L23.5 18.5 L13 24.5 L2.5 18.5 L2.5 7.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M13 7 L18 10 L18 16 L13 19 L8 16 L8 10 Z" fill="currentColor" opacity="0.18"/>
              </svg>
              <span className="text-sm tracking-tight flex items-baseline gap-[2px]">
                <span className="font-mono font-medium text-[hsl(var(--muted-foreground))] text-[13px]">Stylus</span>
                <span className="font-bold text-[hsl(213,80%,68%)] text-[14px]" style={{ fontFamily: 'var(--font-heading)' }}>Arena</span>
              </span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed max-w-sm">
              A browser playground for Arbitrum Stylus. Built as a lightweight on-ramp alongside the{" "}
              <a
                href="https://docs.arbitrum.io/stylus"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[hsl(var(--foreground))] transition-colors"
              >
                official Stylus docs
              </a>{" "}
              and CLI flow.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">
              Product
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/playground" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Playground
              </Link>
              <Link href="/playground#gas" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Gas Dashboard
              </Link>
              <a href="https://faucet.arbitrum.io/" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Get Testnet ETH
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/Fosurero/StylusArena" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                GitHub
              </a>
              <a href="https://docs.arbitrum.io/stylus" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Stylus Docs
              </a>
              <a href="https://sepolia.arbiscan.io" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Arbiscan Sepolia
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--border))] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} StylusArena. Built for the Arbitrum Stylus ecosystem.
          </p>
          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
            Deploys to Arbitrum Sepolia testnet &bull; Chain ID 421614
          </p>
        </div>
      </div>
    </footer>
  );
}
