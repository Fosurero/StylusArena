# Copilot Instructions for StylusArena

## Big picture
- This is a Next.js App Router frontend-only playground for Arbitrum Stylus onboarding (no backend services).
- The root shell is in `src/app/layout.tsx` and always wraps pages with `Providers`, `Navbar`, and `Footer`.
- Main user flows:
  - Landing page (`src/app/page.tsx`) markets templates + gas savings.
  - Playground (`src/app/playground/page.tsx`) coordinates template selection, code editing, deploy guidance, and contract interaction.

## Data and state flow
- `src/lib/templates.ts` is the single source of truth for template metadata, code snippets, Solidity equivalents, and gas numbers.
- `playground/page.tsx` owns selected template + editable Stylus code state, then passes props down:
  - `TemplateSelector` chooses a template
  - `DualEditor` edits Stylus / views Solidity
  - `DeployPanel` uses current code + template id
  - `GasDashboard` renders selected + global gas comparison
- Keep new UI data template-driven when possible; extend `ContractTemplate` instead of duplicating constants across components.

## Web3 integration boundaries
- Wagmi config lives in `src/lib/wagmi.ts` and is limited to Arbitrum Sepolia (`421614`).
- `NEXT_PUBLIC_WC_PROJECT_ID` enables WalletConnect connector; without it, only injected wallets appear.
- Providers are client-side only in `src/components/providers.tsx` (`WagmiProvider` + `QueryClientProvider`).
- Deploy UX in `src/components/deploy-panel.tsx` is intentionally a guided MVP:
  - "Deploy" action shows `cargo stylus` CLI instructions (not in-browser compilation/deploy).
  - Contract interaction currently uses a fixed counter ABI (`increment`, `decrement`, `get_count`, `set_count`).

## UI and styling conventions
- Styling uses Tailwind v4 + custom HSL theme tokens and utility classes from `src/app/globals.css` (`glass`, `gradient-primary`, `gradient-text`, `glow-*`).
- Preserve the dark neon visual language; prefer existing CSS tokens/utilities over introducing new one-off styles.
- Most interactive components are client components (`"use client"`), especially anything using wagmi hooks, state, or Monaco.
- Monaco editor is dynamically imported with `ssr: false` in `src/components/code-editor.tsx`; follow this pattern for browser-only libs.

## Developer workflows
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Start build: `npm start`
- Lint: `npm run lint`
- There is currently no test suite configured in `package.json`; avoid inventing test commands in automation/docs.

## Project-specific implementation guidance
- Use the `@/*` path alias configured in `tsconfig.json` for imports from `src`.
- Keep TypeScript strictness compatible with current settings (`strict: true`).
- Follow existing naming and prop patterns in components (small, focused, prop-driven, colocated in `src/components`).
- When changing wallet/network behavior, update both `src/lib/wagmi.ts` and user-facing network cues in `ConnectButton` / `DeployPanel`.
- If template IDs or shape change, update all consumers (`TemplateSelector`, `GasDashboard`, `playground/page.tsx`) together.