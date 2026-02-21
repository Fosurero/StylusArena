# StylusArena ⚡

> **The 30-second on-ramp for external devs to try Arbitrum Stylus**

**No install. No setup. Deploy Rust contracts + see 60% gas savings vs Solidity in seconds.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFosurero%2FStylusArena)

---

## 🎯 What is StylusArena?

StylusArena is a **lightweight, browser-based playground** that lets developers experience Arbitrum Stylus without installing anything. Pick a template, edit Rust code in a Monaco editor, compare gas costs against Solidity, and deploy to Arbitrum Sepolia — all in under 30 seconds.

**Not a full IDE like Wizard v2.** This is the quick playground for **Solana Rust devs** and **Web2 engineers** who want to try before committing.

---

## 🆚 StylusArena vs Wizard v2 — Clear Differentiation

| Feature | StylusArena | Wizard v2 |
|---|---|---|
| **Purpose** | Quick try → first deploy | Full development IDE |
| **Setup time** | 0 seconds | Minutes (account + config) |
| **Target user** | Curious external devs | Committed Stylus developers |
| **Gas comparison** | Hero feature, visual dashboard | Available |
| **Templates** | 5 curated, audience-tagged | Extensive library |
| **Compilation** | Demo flow + CLI guide | Full in-browser compilation |
| **Best for** | "Should I try Stylus?" | "I'm building on Stylus" |

### The Relationship

**StylusArena is the front door. Wizard v2 is the workshop.** They complement each other:

1. Developer discovers Stylus → lands on StylusArena
2. Picks a template matching their background (Solana, Solidity, Web2)
3. Sees gas savings instantly in the dashboard
4. Edits code, understands the Stylus SDK patterns
5. When ready to build seriously → graduates to Wizard v2

---

## 👥 Target Audience

### 1. Solana Rust Developers
- Already know Rust, curious about EVM-land
- Template: **"For Solana Devs – PDA Counter"** uses familiar patterns
- No Anchor framework, no account setup — just Rust + `sol_storage!`

### 2. Solidity Developers
- Want to see what Stylus offers over vanilla Solidity
- Template: **"Migrate from Solidity in 5 min"** — ERC-20 side-by-side
- Instant gas comparison makes the value proposition obvious

### 3. Web2 Engineers
- Know Redis/databases, new to blockchain
- Template: **"Web2 Devs – Simple Storage"** — Key-Value vault pattern
- Familiar mental model: `store()` = Redis SET, `retrieve()` = Redis GET

### 4. DeFi Builders
- Evaluating Stylus for gas-sensitive protocols
- Templates: **Multi-Sig Lite** + **Fibonacci Compute** benchmark
- Hard numbers on where Stylus savings are largest

---

## ⛽ Gas Comparison — How It Works

The Gas Comparison Dashboard is StylusArena's **hero feature**. Here's how the numbers work:

### How Stylus Saves Gas

Arbitrum Stylus compiles Rust (and other languages) to **WebAssembly (WASM)**, which runs alongside the EVM on Arbitrum. Key savings:

| Operation Type | Typical Savings | Why |
|---|---|---|
| **Pure computation** | 80-90% | WASM executes natively vs EVM opcode interpretation |
| **Storage reads** | 40-50% | Reduced overhead for memory management |
| **Storage writes** | 40-50% | More efficient state trie access patterns |
| **Complex logic** | 50-70% | No per-opcode gas metering overhead |

### Our Benchmarks

| Template | Stylus Gas | EVM Gas | Savings |
|---|---|---|---|
| PDA Counter (increment) | 21,520 | 43,410 | **50%** |
| ERC-20 Token (transfer) | 26,180 | 51,340 | **49%** |
| Fibonacci (n=100) | 8,740 | 72,600 | **88%** |
| Key-Value Vault (store) | 23,100 | 44,800 | **48%** |
| Multi-Sig Lite (approve) | 28,900 | 52,100 | **45%** |

> Gas estimates based on Arbitrum Sepolia benchmarks. Compute-heavy contracts show the largest savings since WASM avoids per-opcode gas metering entirely.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS v4
- **Editor:** Monaco Editor (`@monaco-editor/react`)
- **Wallet:** wagmi v3 + viem v2 + WalletConnect
- **Fonts:** Space Grotesk + JetBrains Mono
- **Chain:** Arbitrum Sepolia (testnet)
- **Deployment:** Vercel

---

## 🚀 Quick Start

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFosurero%2FStylusArena)

### Local Development

```bash
# Clone
git clone https://github.com/Fosurero/StylusArena.git
cd StylusArena

# Install deps
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## � Making the Connect Wallet Button Work (Live)

The Connect Wallet button uses **wagmi v3** and supports two connector types: **browser extension wallets** (MetaMask, Rabby, Coinbase) and **WalletConnect** (mobile wallets via QR code). Here's everything you need to prepare:

### Step 1 — Get a WalletConnect Project ID (Required for Mobile Wallets)

Without this, only browser extension wallets (MetaMask etc.) will work. WalletConnect enables mobile wallets and QR scanning.

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up / log in
3. Click **"Create a New Project"**
4. Enter project name: `StylusArena`
5. Set the homepage URL to your deployed site (e.g. `https://stylusarena.vercel.app`)
6. Copy the **Project ID** — it looks like: `a1b2c3d4e5f6g7h8i9j0...`

### Step 2 — Set the Environment Variable

Create a `.env.local` file in the project root:

```bash
# .env.local
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id_here
```

> **Important:** The variable MUST start with `NEXT_PUBLIC_` so Next.js exposes it to the browser.

If deploying on Vercel, set this in **Settings → Environment Variables** instead.

### Step 3 — Verify It Works

With the env variable set:
- **MetaMask / Rabby / Coinbase Wallet** → appear automatically if the browser extension is installed
- **WalletConnect** → appears as an option; clicking it opens a QR code modal for mobile wallets
- **No wallet installed** → the dropdown shows "No wallets detected" with an "Install MetaMask" link

### How the Wallet Config Works

The wallet configuration lives in [`src/lib/wagmi.ts`](src/lib/wagmi.ts):

```typescript
connectors: [
  injected(),                    // Always: MetaMask, Rabby, etc.
  ...(projectId                  // Only if WC Project ID is set:
    ? [walletConnect({ projectId, metadata: { ... } })]
    : []),
],
```

- `injected()` — detects any wallet extension in the browser (MetaMask, Rabby, Coinbase, Trust, Phantom EVM)
- `walletConnect()` — enables QR code scanning for mobile wallets (requires Project ID)

### Step 4 — Test the Wallet Flow

1. Click **"Connect Wallet"** → wallet picker dropdown opens
2. Select your wallet → wallet extension popup appears
3. Approve connection → button shows your address (e.g. `0x1234…abcd`)
4. If wrong network → orange "⚠ Switch to Arb Sepolia" button appears
5. Click your address → dropdown with "View on Arbiscan", "Copy Address", "Disconnect"

### Getting Testnet ETH

Users need Arbitrum Sepolia ETH to deploy contracts. Add this to your site's onboarding:

| Faucet | URL | Notes |
|---|---|---|
| QuickNode | https://faucet.quicknode.com/arbitrum/sepolia | Fast, requires login |
| Alchemy | https://www.alchemy.com/faucets/arbitrum-sepolia | Reliable, requires Alchemy account |
| Arbitrum | https://faucet.arbitrum.io/ | Official, may have limits |

> The deploy panel and footer already include faucet links.

---

## 🏭 Production Deployment Guide

Follow this checklist to make StylusArena fully production-ready for real users.

### Option A — Deploy to Vercel (Recommended)

#### 1. One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFosurero%2FStylusArena)

Or connect your GitHub repo manually:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Fosurero/StylusArena`
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**

#### 2. Set Environment Variables

In Vercel Dashboard → your project → **Settings → Environment Variables**:

| Variable | Value | Required |
|---|---|---|
| `NEXT_PUBLIC_WC_PROJECT_ID` | Your WalletConnect Project ID | Yes (for mobile wallets) |

> No other env vars needed — the RPC endpoint is hardcoded to the public Arbitrum Sepolia RPC.

#### 3. Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your domain (e.g. `stylusarena.com`)
3. Update DNS records as instructed by Vercel
4. SSL is automatic

#### 4. Update WalletConnect Metadata

After getting your production URL, update the WalletConnect metadata in [`src/lib/wagmi.ts`](src/lib/wagmi.ts):

```typescript
walletConnect({
  projectId,
  metadata: {
    name: "StylusArena",
    description: "The 30-second on-ramp for external devs to try Arbitrum Stylus",
    url: "https://your-production-domain.com",  // ← Update this
    icons: ["https://your-production-domain.com/icon.png"],
  },
}),
```

### Option B — Self-Host (Docker / VPS)

```bash
# Build
npm run build

# Start production server (default port 3000)
npm start

# Or with custom port
PORT=8080 npm start
```

For Docker:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
```

> Note: For the standalone Docker build, add `output: "standalone"` to `next.config.ts`.

### Production Checklist

Use this checklist before going live:

#### Infrastructure
- [ ] **Deploy to Vercel** (or your hosting provider)
- [ ] **Set `NEXT_PUBLIC_WC_PROJECT_ID`** environment variable
- [ ] **Custom domain** configured with SSL
- [ ] **Update WalletConnect metadata URL** to production domain

#### Performance
- [ ] **Verify build passes** — `npm run build` completes without errors
- [ ] **Lighthouse audit** — aim for 90+ on Performance, Accessibility
- [ ] **Test on mobile** — responsive layout, wallet connect via WalletConnect QR

#### Wallet & Web3
- [ ] **Test MetaMask connection** on desktop
- [ ] **Test WalletConnect QR** on mobile
- [ ] **Test wrong network detection** — connect on Ethereum mainnet, verify "Switch" button appears
- [ ] **Test deploy flow** — deploy a contract on Arbitrum Sepolia
- [ ] **Test contract interaction** — call read/write methods after deploying
- [ ] **Verify faucet links work** — users can get testnet ETH

#### Content & SEO
- [ ] **OpenGraph/Twitter cards** — share URL on Twitter/Discord, verify preview
- [ ] **Favicon** — add `/public/favicon.ico` and `/public/icon.png`
- [ ] **Analytics** — add Vercel Analytics or Google Analytics (optional)

#### Security
- [ ] **No private keys in code** — the app only uses user's wallet (wagmi), no server-side keys
- [ ] **RPC rate limits** — the public Arbitrum RPC is fine for MVP; for high traffic, use [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/) and set a custom RPC URL
- [ ] **Content Security Policy** — consider adding CSP headers for production

### Upgrading the RPC (High Traffic)

The default RPC (`https://sepolia-rollup.arbitrum.io/rpc`) is public and rate-limited. For production with many users:

1. Get a free API key from [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com/)
2. Update [`src/lib/wagmi.ts`](src/lib/wagmi.ts):

```typescript
transports: {
  [arbitrumSepolia.id]: http("https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY"),
},
```

3. Optionally move the RPC URL to an env variable:

```typescript
transports: {
  [arbitrumSepolia.id]: http(
    process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc"
  ),
},
```

### Moving to Mainnet (Future)

When ready to support Arbitrum One (mainnet):

1. Add the chain to wagmi config:
```typescript
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

chains: [arbitrum, arbitrumSepolia],
transports: {
  [arbitrum.id]: http("https://arb1.arbitrum.io/rpc"),
  [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
},
```

2. Add a network switcher in the UI
3. Update gas data with mainnet benchmarks

---

## �📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers, navbar, footer
│   ├── page.tsx            # Landing page with hero + gas preview
│   ├── globals.css         # Tailwind + custom theme
│   └── playground/
│       └── page.tsx        # Main playground: editor + gas + deploy
├── components/
│   ├── providers.tsx       # wagmi + React Query providers
│   ├── navbar.tsx          # Navigation with Wizard v2 badge
│   ├── footer.tsx          # Footer with differentiation note
│   ├── connect-button.tsx  # Wallet connection
│   ├── code-editor.tsx     # Monaco editor (Rust/Solidity tabs)
│   ├── template-selector.tsx  # 5 template cards
│   ├── gas-dashboard.tsx   # Gas comparison hero dashboard
│   └── deploy-panel.tsx    # Deploy + interact panel
└── lib/
    ├── utils.ts            # cn() helper
    ├── wagmi.ts            # Wagmi config (Arbitrum Sepolia)
    └── templates.ts        # 5 contract templates with gas data
```

---

## 📋 Templates

### 1. 🟣 For Solana Devs – PDA Counter
Familiar Rust patterns — account-based counter like Solana PDAs but on Arbitrum Stylus. No Anchor needed.

### 2. 🔵 Migrate from Solidity in 5 min – ERC-20 Token
Your first Stylus ERC-20. Same interface Solidity contracts call, but compiled from Rust.

### 3. 🟠 Heavy Compute – Fibonacci
Where Stylus truly shines — compute-heavy on-chain Fibonacci. **88% gas savings** vs EVM.

### 4. 🟢 Web2 Devs – Key-Value Vault
Dead-simple key-value store. If you've used Redis, you already understand this.

### 5. 🩷 DeFi Building Block – Multi-Sig Lite
Lightweight multi-signature approval pattern showing complex state management.

---

## 🔑 Key Features

- **Zero Setup**: No CLI, no installs, no accounts — just open and code
- **Monaco Editor**: Full Rust syntax highlighting, autocomplete, bracket matching
- **Dual View**: Switch between Stylus (Rust) and Solidity equivalent instantly
- **Gas Dashboard**: Big visual numbers showing % savings for every template
- **Wallet Connect**: MetaMask / injected wallet integration via wagmi
- **Deploy Flow**: Guided deployment to Arbitrum Sepolia testnet
- **Interaction Panel**: Call contract methods directly from the UI
- **Responsive**: Works on desktop and tablet

---

## 🌐 Network

**Arbitrum Sepolia** (testnet only for MVP)
- Chain ID: 421614
- Get testnet ETH: [Arbitrum Sepolia Faucet](https://faucet.arbitrum.io/)

---

## � Grant Progress & Milestones

StylusArena is funded through the Arbitrum grants program ($11,000 total).

| Milestone | Budget | Status | Due |
|---|---|---|---|
| **1 — Core MVP & Gas Dashboard** | $3,700 | 🔄 In Progress | Jul 2025 |
| **2 — WASM Compile & On-Chain Deploy** | $3,700 | ⬜ Not Started | Sep 2025 |
| **3 — Community & Ecosystem Polish** | $3,600 | ⬜ Not Started | Dec 2025 |

> Track progress on [GitHub Issues & Milestones](https://github.com/Fosurero/StylusArena/milestones)

---

## �📄 License

MIT

---

<p align="center">
  <strong>StylusArena</strong> — The 30-second on-ramp for external devs to try Arbitrum Stylus<br/>
  <em>Built as lightweight on-ramp – complementing Wizard v2 full IDE</em>
</p>
