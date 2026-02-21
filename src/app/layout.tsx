import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "StylusArena — Try Arbitrum Stylus in 30 Seconds",
  description:
    "No install. No setup. Deploy Rust contracts and see 60% gas savings vs Solidity in seconds. The quick playground for Solana Rust devs and Web2 engineers.",
  keywords: [
    "Arbitrum",
    "Stylus",
    "Rust",
    "Smart Contracts",
    "WASM",
    "Gas Savings",
    "Playground",
    "Solana",
    "Ethereum",
  ],
  openGraph: {
    title: "StylusArena — Try Arbitrum Stylus in 30 Seconds",
    description: "No install. No setup. Deploy Rust contracts + see 60% gas savings vs Solidity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StylusArena — Try Arbitrum Stylus in 30 Seconds",
    description: "No install. No setup. Deploy Rust contracts + see 60% gas savings vs Solidity.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
