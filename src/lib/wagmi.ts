import { http, createConfig } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

export const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    injected(),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "StylusArena",
              description:
                "The 30-second on-ramp for external devs to try Arbitrum Stylus",
              url: "https://stylusarena.vercel.app",
              icons: [],
            },
          }),
        ]
      : []),
  ],
  transports: {
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
