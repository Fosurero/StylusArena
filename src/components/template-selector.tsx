"use client";

import { templates, type ContractTemplate } from "@/lib/templates";

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (template: ContractTemplate) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-black text-[hsl(var(--muted-foreground))] uppercase tracking-[0.2em]">
        Contract Templates
      </h3>
      <div className="space-y-2">
        {templates.map((template) => {
          const savings = Math.round(
            ((template.gasEvm - template.gasStylus) / template.gasEvm) * 100
          );
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`w-full text-left p-3 rounded-xl border transition-all hover:scale-[1.02] ${
                selectedId === template.id
                  ? "border-[hsl(var(--primary))]/50 bg-[hsl(var(--primary))]/10 glow-blue"
                  : "border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground))]/50 glass-hover"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${template.badgeColor}`}
                  >
                    {template.badge}
                  </span>
                  <p className="text-sm font-bold mt-1.5">{template.title}</p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">
                    {template.subtitle}
                  </p>
                </div>
                <span className="text-xs font-black text-emerald-400 whitespace-nowrap font-mono">
                  -{savings}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
