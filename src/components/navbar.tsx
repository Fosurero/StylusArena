"use client";

import Link from "next/link";
import { ConnectButton } from "./connect-button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-[hsla(225,15%,25%,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-sm tracking-tight">SA</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Stylus<span className="gradient-text">Arena</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/playground"
                className="px-3 py-1.5 text-sm rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
              >
                Playground
              </Link>
              <Link
                href="/playground#gas"
                className="px-3 py-1.5 text-sm rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
              >
                Gas Compare
              </Link>
              <a
                href="https://github.com/Fosurero/StylusArena"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden xl:inline text-[10px] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
              Lightweight on-ramp &bull; Complements Wizard v2
            </span>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
