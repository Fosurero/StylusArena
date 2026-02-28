"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { templates, type ContractTemplate } from "@/lib/templates";
import { TemplateSelector } from "@/components/template-selector";
import { DualEditor } from "@/components/code-editor";
import { GasDashboard } from "@/components/gas-dashboard";
import { DeployPanel } from "@/components/deploy-panel";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");

  const [selected, setSelected] = useState<ContractTemplate>(
    templates.find((t) => t.id === templateParam) || templates[0]
  );
  const [code, setCode] = useState(selected.code);

  useEffect(() => {
    if (templateParam) {
      const found = templates.find((t) => t.id === templateParam);
      if (found) {
        setSelected(found);
        setCode(found.code);
      }
    }
  }, [templateParam]);

  const handleSelectTemplate = (template: ContractTemplate) => {
    setSelected(template);
    setCode(template.code);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Stylus <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            Edit Rust contracts, compare gas, deploy to Arbitrum Sepolia —
            all in your browser
          </p>
        </div>
        <span className="hidden md:inline text-[10px] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
          Lightweight on-ramp · Wizard v2 complement
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-2">
          <TemplateSelector
            selectedId={selected.id}
            onSelect={handleSelectTemplate}
          />
        </div>

        <div className="lg:col-span-7">
          <DualEditor
            stylusCode={code}
            solidityCode={selected.solidityEquivalent}
            onStylusChange={setCode}
          />
        </div>

        <div className="lg:col-span-3">
          <DeployPanel contractCode={code} templateId={selected.id} />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent" />
          <h2 className="text-xl font-black tracking-tight whitespace-nowrap">
            ⛽ Gas Comparison{" "}
            <span className="gradient-text">Dashboard</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent" />
        </div>
        <GasDashboard selectedId={selected.id} />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[hsl(var(--muted-foreground))]">Loading playground...</div>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
