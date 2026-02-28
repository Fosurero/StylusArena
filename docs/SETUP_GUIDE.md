# StylusArena — Setup & Production Guide (Private)

> **This file is for you (the maintainer) only.** It covers how to make the Connect Wallet button work live, how to deploy to production, and everything you need to prepare.

---

## 🔌 Making the Connect Wallet Button Work (Live)

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

The wallet configuration lives in `src/lib/wagmi.ts`:

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

Users need Arbitrum Sepolia ETH to deploy contracts:

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

After getting your production URL, update the WalletConnect metadata in `src/lib/wagmi.ts`:

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
2. Update `src/lib/wagmi.ts`:

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

## 🔑 Quick Reference — Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WC_PROJECT_ID` | `.env.local` or Vercel | WalletConnect Project ID for mobile wallets |
| `NEXT_PUBLIC_RPC_URL` | `.env.local` or Vercel | (Optional) Custom RPC URL for Arbitrum Sepolia |

---

## ❓ Troubleshooting

### "Connect Wallet" does nothing
- **No wallet extension installed** — Install [MetaMask](https://metamask.io/download/) or another wallet
- **WalletConnect not showing** — Set `NEXT_PUBLIC_WC_PROJECT_ID` in `.env.local`
- **Popup blocked** — Allow popups for localhost / your domain

### "Switch to Arb Sepolia" keeps appearing
- The user's wallet is on the wrong network
- Click the button — it sends a `wallet_switchEthereumChain` request
- If Arbitrum Sepolia isn't added yet, MetaMask will prompt to add it

### Deploy fails with "insufficient funds"
- The user needs testnet ETH — use one of the faucets listed above
- Each deploy costs ~0.001-0.01 Sepolia ETH

### Build fails locally
```bash
rm -rf .next node_modules
npm install
npm run build
```
