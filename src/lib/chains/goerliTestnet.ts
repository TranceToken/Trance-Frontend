import { Chain } from "wagmi";

export const goerliTestnet: Chain = {
  id: 5,
  name: "goerli",
  network: "Goerli Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Goerli Testnet",
    symbol: "Goerli ETH",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/eth_goerli",
  },
  blockExplorers: {
    default: { name: "goerli Testnet", url: "https://goerli.etherscan.io/" },
  },
  testnet: false,
};
