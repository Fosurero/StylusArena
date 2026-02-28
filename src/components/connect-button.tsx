"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { useState, useEffect, useRef } from "react";

function connectorIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("metamask")) return "🦊";
  if (n.includes("walletconnect")) return "🔗";
  if (n.includes("coinbase")) return "🔵";
  if (n.includes("rabby")) return "🐰";
  if (n.includes("phantom")) return "👻";
  if (n.includes("trust")) return "🛡️";
  return "💼";
}

export function ConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [showMenu, setShowMenu] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const wrongNetwork = isConnected && chain?.id !== arbitrumSepolia.id;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowWalletPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (connectError) {
      const msg = connectError.message || "Connection failed";
      if (msg.includes("User rejected")) {
        setError("Connection rejected by user");
      } else if (msg.includes("already pending")) {
        setError("Check your wallet — a request is already pending");
      } else {
        setError(msg.length > 80 ? msg.slice(0, 80) + "…" : msg);
      }
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [connectError]);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        {wrongNetwork ? (
          <button
            onClick={() => switchChain({ chainId: arbitrumSepolia.id })}
            className="px-3 py-2 text-xs font-bold rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors cursor-pointer"
          >
            ⚠ Switch to Arb Sepolia
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-bold">Arb Sepolia</span>
          </div>
        )}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl glass glass-hover transition-all cursor-pointer border border-[hsl(var(--border))]"
          >
            <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">
                {address.slice(2, 4).toUpperCase()}
              </span>
            </div>
            <span className="font-mono text-xs font-medium">
              {address.slice(0, 6)}…{address.slice(-4)}
            </span>
            <svg
              className={`w-3 h-3 opacity-50 transition-transform ${showMenu ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 py-1 rounded-xl glass border border-[hsl(var(--border))] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-[hsl(var(--border))]">
                <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] font-bold">
                  Connected
                </p>
                <p className="text-xs font-mono mt-0.5 text-[hsl(var(--foreground))]">
                  {address.slice(0, 10)}…{address.slice(-8)}
                </p>
              </div>
              <a
                href={`https://sepolia.arbiscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Arbiscan
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  setCopied(true);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? "✓ Copied!" : "Copy Address"}
              </button>
              <hr className="border-[hsl(var(--border))] my-1" />
              <button
                onClick={() => {
                  disconnect();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setShowWalletPicker(!showWalletPicker)}
        disabled={isPending}
        className="group relative px-5 py-2.5 text-sm font-bold rounded-xl overflow-hidden transition-all cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 gradient-primary opacity-90 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center gap-2 text-white">
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Connecting…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect Wallet
            </>
          )}
        </span>
      </button>

      {showWalletPicker && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl glass border border-[hsl(var(--border))] shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
            <p className="text-sm font-bold">Connect a Wallet</p>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">
              Choose your preferred wallet to connect
            </p>
          </div>

          <div className="p-2 space-y-1">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  setError(null);
                  connect(
                    { connector },
                    {
                      onSuccess: () => setShowWalletPicker(false),
                    }
                  );
                }}
                disabled={isPending}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-all cursor-pointer disabled:opacity-50 group text-left"
              >
                <span className="text-xl w-8 h-8 flex items-center justify-center rounded-lg bg-[hsl(var(--muted))] group-hover:scale-110 transition-transform">
                  {connectorIcon(connector.name)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{connector.name}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                    {connector.id === "injected"
                      ? "Browser extension"
                      : connector.id === "walletConnect"
                        ? "Scan with mobile wallet"
                        : connector.type || "Wallet"}
                  </p>
                </div>
                <svg className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            {connectors.length === 0 && (
              <div className="px-3 py-4 text-center">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">No wallets detected</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[hsl(var(--primary))] hover:underline mt-1 inline-block"
                >
                  Install MetaMask →
                </a>
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 py-2 border-t border-red-500/20 bg-red-500/10">
              <p className="text-[11px] text-red-400">{error}</p>
            </div>
          )}

          <div className="px-4 py-2.5 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] text-center">
              New to Ethereum?{" "}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--primary))] hover:underline font-medium"
              >
                Get MetaMask
              </a>
              {" · "}
              <a
                href="https://faucet.arbitrum.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-medium"
              >
                Get Testnet ETH
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
