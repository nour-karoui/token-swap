import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

const evmNetworks = [
  {
    blockExplorerUrls: ["https://etherscan.io/"],
    chainId: 1,
    chainName: "Ethereum Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    name: "Ethereum",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
      iconUrl: "https://app.dynamic.xyz/assets/networks/eth.svg",
    },
    networkId: 1,

    rpcUrls: ["https://mainnet.infura.io/v3/"],
    vanityName: "ETH Mainnet",
  },
  {
    blockExplorerUrls: ["https://sepolia.basescan.org/"],
    chainId: 84532,
    chainName: "Base Sepolia",
    name: "Base Sepolia",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
      iconUrl: "https://app.dynamic.xyz/assets/networks/eth.svg",
    },
    networkId: 84532,
    rpcUrls: ["https://sepolia.base.org"],
    vanityName: "Base Sepolia",
  },
];

const queryClient = new QueryClient();

export const ConnectWallet = () => {
  return (
    // @ts-expect-error this is working
    <DynamicContextProvider
      settings={{
        environmentId: "48a47c67-12be-4c66-8d0b-f1365a7ad7a9",
        walletConnectors: [EthereumWalletConnectors],
        flowNetwork: "testnet",
        overrides: { evmNetworks },
      }}
    >
      <>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              {/* @ts-expect-error this is workin */}
              <DynamicWidget />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </>
    </DynamicContextProvider>
  );
};
