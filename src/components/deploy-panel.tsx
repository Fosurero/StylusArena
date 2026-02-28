"use client";

import { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { encodeFunctionData, decodeFunctionResult, type Hex } from "viem";
import { arbitrumSepolia } from "wagmi/chains";

const COUNTER_ABI = [
  {
    name: "increment",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "get_count",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "set_count",
    type: "function",
    inputs: [{ name: "value", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "decrement",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

interface DeployPanelProps {
  contractCode: string;
  templateId: string;
}

export function DeployPanel({ contractCode, templateId }: DeployPanelProps) {
  const { isConnected, address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"info" | "success" | "error">("info");
  const [interactionResult, setInteractionResult] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const wrongNetwork = isConnected && chain?.id !== arbitrumSepolia.id;

  const handleDeploy = async () => {
    if (!walletClient || !isConnected) {
      setStatus("Please connect your wallet first");
      setStatusType("error");
      return;
    }

    if (wrongNetwork) {
      setStatus("Please switch to Arbitrum Sepolia network");
      setStatusType("error");
      return;
    }

    setIsDeploying(true);
    setStatusType("info");
    setStatus("Preparing deployment guidance...");

    try {
      setStatusType("success");
      setStatus(
        "Stylus contracts require cargo-stylus CLI for compilation.\n\n" +
        "To deploy this contract:\n" +
        "1. cargo install cargo-stylus\n" +
        "2. cargo stylus check\n" +
        "3. cargo stylus deploy --endpoint https://sepolia-rollup.arbitrum.io/rpc\n\n" +
        "Or paste an existing contract address below to interact with it."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setStatus(msg);
      setStatusType("error");
    } finally {
      setIsDeploying(false);
    }
  };

  const handleInteraction = async (method: string) => {
    if (!deployedAddress || !deployedAddress.startsWith("0x")) {
      setInteractionResult("Enter a valid contract address (0x...)");
      return;
    }

    if (!walletClient || !publicClient) {
      setInteractionResult("Connect wallet first");
      return;
    }

    if (wrongNetwork) {
      setInteractionResult("Switch to Arbitrum Sepolia first");
      return;
    }

    setIsInteracting(true);

    try {
      const abiItem = COUNTER_ABI.find((a) => a.name === method);
      if (!abiItem) {
        setInteractionResult(`Method ${method} not found`);
        return;
      }

      if (abiItem.stateMutability === "view") {
        // Read call via public client
        const data = encodeFunctionData({
          abi: COUNTER_ABI,
          functionName: method as "get_count",
        });

        const result = await publicClient.call({
          to: deployedAddress as Hex,
          data,
        });

        if (result.data) {
          const decoded = decodeFunctionResult({
            abi: COUNTER_ABI,
            functionName: method as "get_count",
            data: result.data,
          });
          setInteractionResult(`Result: ${decoded.toString()}`);
        } else {
          setInteractionResult("No data returned");
        }
      } else {
        // Write call via wallet
        const args: unknown[] = [];
        if (method === "set_count" && inputValue) {
          args.push(BigInt(inputValue));
        }

        const data = encodeFunctionData({
          abi: COUNTER_ABI,
          functionName: method as "increment" | "set_count" | "decrement",
          args: args as [],
        });

        const hash = await walletClient.sendTransaction({
          to: deployedAddress as Hex,
          data,
          chain: arbitrumSepolia,
          account: address!,
        });

        setTxHash(hash);
        setInteractionResult(`Tx sent! Waiting for confirmation...`);

        // Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        setInteractionResult(
          `Confirmed in block ${receipt.blockNumber.toString()}. Gas used: ${receipt.gasUsed.toString()}`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transaction failed";
      // Clean up long error messages
      const shortMsg = msg.length > 200 ? msg.slice(0, 200) + "..." : msg;
      setInteractionResult(`Error: ${shortMsg}`);
    } finally {
      setIsInteracting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Deploy to Arbitrum Sepolia
        </h3>

        {!isConnected ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-xl gradient-primary mx-auto mb-3 flex items-center justify-center opacity-50">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">
              Connect your wallet to get started
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] opacity-70">
              Supports MetaMask & injected wallets
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {wrongNetwork && (
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                Wrong network — switch to Arbitrum Sepolia
              </div>
            )}
            <button
              onClick={handleDeploy}
              disabled={isDeploying || wrongNetwork}
              className="group w-full py-3 rounded-xl gradient-primary text-white font-semibold text-sm
                       hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed
                       active:scale-[0.98]"
            >
              {isDeploying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Deploy Contract
                </span>
              )}
            </button>

            {status && (
              <div className={`p-3 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed ${
                statusType === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  : statusType === "error"
                  ? "bg-red-500/10 border border-red-500/20 text-red-300"
                  : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
              }`}>
                {status}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Interact with Contract
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5 block font-medium">
              Contract Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={deployedAddress}
              onChange={(e) => setDeployedAddress(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]
                       text-sm font-mono placeholder:text-[hsl(var(--muted-foreground))]/40
                       focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/50 focus:border-[hsl(var(--primary))]/50
                       transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5 block font-medium">
              Value <span className="opacity-50">(for set_count)</span>
            </label>
            <input
              type="text"
              placeholder="42"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]
                       text-sm font-mono placeholder:text-[hsl(var(--muted-foreground))]/40
                       focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/50 focus:border-[hsl(var(--primary))]/50
                       transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { method: "increment", label: "increment()", color: "hover:border-emerald-500/40 hover:text-emerald-400" },
              { method: "decrement", label: "decrement()", color: "hover:border-orange-500/40 hover:text-orange-400" },
              { method: "get_count", label: "get_count()", color: "hover:border-blue-500/40 hover:text-blue-400" },
              { method: "set_count", label: "set_count()", color: "hover:border-purple-500/40 hover:text-purple-400" },
            ].map(({ method, label, color }) => (
              <button
                key={method}
                onClick={() => handleInteraction(method)}
                disabled={isInteracting}
                className={`py-2.5 px-3 rounded-lg border border-[hsl(var(--border))] text-xs font-mono
                           transition-all active:scale-[0.97] disabled:opacity-40 ${color}`}
              >
                {label}
              </button>
            ))}
          </div>

          {interactionResult && (
            <div className="p-3 rounded-lg bg-[hsl(var(--muted))] text-xs font-mono text-[hsl(var(--muted-foreground))] leading-relaxed">
              {interactionResult}
            </div>
          )}

          {txHash && (
            <a
              href={`https://sepolia.arbiscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--primary))] hover:underline font-medium"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Arbiscan
            </a>
          )}
        </div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Need testnet ETH?</p>
        <a
          href="https://faucet.arbitrum.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[hsl(var(--primary))] hover:underline font-medium"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Arbitrum Sepolia Faucet
        </a>
      </div>
    </div>
  );
}
