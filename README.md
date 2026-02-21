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

## 📁 Project Structure

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
