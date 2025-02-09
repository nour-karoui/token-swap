import { base, baseSepolia } from "wagmi/chains";
import { http, createConfig } from "wagmi";

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
