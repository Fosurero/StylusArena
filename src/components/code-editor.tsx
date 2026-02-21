"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

export function CodeEditor({
  code,
  onChange,
  language = "rust",
  height = "600px",
}: CodeEditorProps) {
  const handleChange = useCallback(
    (value: string | undefined) => {
      onChange(value || "");
    },
    [onChange]
  );

  return (
    <div className="rounded-xl overflow-hidden border border-[hsl(var(--border))]">
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2 font-mono">
            lib.rs — Stylus Contract
          </span>
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          {language.toUpperCase()} • Stylus SDK
        </span>
      </div>
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 22,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
}

interface DualEditorProps {
  stylusCode: string;
  solidityCode: string;
  onStylusChange: (value: string) => void;
}

export function DualEditor({
  stylusCode,
  solidityCode,
  onStylusChange,
}: DualEditorProps) {
  const [activeTab, setActiveTab] = useState<"stylus" | "solidity">("stylus");

  return (
    <div>
      <div className="flex gap-1 mb-2">
        <button
          onClick={() => setActiveTab("stylus")}
          className={`px-4 py-2 rounded-t-xl text-sm font-bold transition-all ${
            activeTab === "stylus"
              ? "bg-[hsl(var(--card))] text-emerald-400 border border-[hsl(var(--border))] border-b-transparent glow-green"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/50"
          }`}
        >
          🦀 Stylus (Rust)
        </button>
        <button
          onClick={() => setActiveTab("solidity")}
          className={`px-4 py-2 rounded-t-xl text-sm font-bold transition-all ${
            activeTab === "solidity"
              ? "bg-[hsl(var(--card))] text-[hsl(var(--primary))] border border-[hsl(var(--border))] border-b-transparent glow-blue"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/50"
          }`}
        >
          ⟠ Solidity (EVM)
        </button>
      </div>

      {activeTab === "stylus" ? (
        <CodeEditor code={stylusCode} onChange={onStylusChange} language="rust" />
      ) : (
        <CodeEditor
          code={solidityCode}
          onChange={() => {}}
          language="solidity"
        />
      )}
    </div>
  );
}
