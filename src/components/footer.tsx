import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">SA</span>
              </div>
              <span className="text-sm font-bold tracking-tight">
                Stylus<span className="gradient-text">Arena</span>
              </span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed max-w-sm">
              The 30-second on-ramp for external devs to try Arbitrum Stylus.
              Built as a lightweight on-ramp — complementing{" "}
              <a
                href="https://wizard.stylus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[hsl(var(--foreground))] transition-colors"
              >
                Wizard v2
              </a>{" "}
              full IDE.
            </p>
          </div>

          {/* Links */}
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
