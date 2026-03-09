"use client";

import { useState } from "react";

interface SharePlaygroundProps {
  templateId: string;
  code: string;
}

export function SharePlayground({ templateId, code }: SharePlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    // Build shareable URL with template param and encoded code
    const url = new URL(window.location.origin + "/playground");
    url.searchParams.set("template", templateId);

    // Only include code param if user modified it (different from template default)
    // The code is encoded in the URL for shareability
    const encoded = btoa(encodeURIComponent(code));
    if (encoded.length < 4000) {
      url.searchParams.set("code", encoded);
    }

    const shareUrl = url.toString();

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                   glass border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/40
                   hover:bg-[hsl(var(--muted))]/50 transition-all cursor-pointer active:scale-95"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-400">Link Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-[hsl(var(--muted-foreground))]">Share</span>
          </>
        )}
      </button>

      {showTooltip && !copied && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg
                        bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))]
                        whitespace-nowrap shadow-xl z-10">
          Copy shareable playground link
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45
                           bg-[hsl(var(--card))] border-r border-b border-[hsl(var(--border))]" />
        </div>
      )}
    </div>
  );
}
