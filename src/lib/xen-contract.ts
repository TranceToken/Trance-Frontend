import { Chain, chain } from "wagmi";
import XENCryptoABI from "~/abi/XENCryptoABI";
import { pulseChain } from "~/lib/chains/pulseChainTestnet";
import { bscTestnet } from "~/lib/chains/bscTestnet";
import { bscMainnet } from "~/lib/chains/bscMainnet";
import { polygonMainnet } from "~/lib/chains/polygonMainnet";
import { avaxMainnet } from "~/lib/chains/avaxMainnet";
import { ethwMainnet } from "~/lib/chains/ethwMainnet";
import { moonbeamMainnet } from "./chains/moonbeamMainnet";
import { evmosMainnet } from "./chains/evmosMainnet";

export const xenContract = (contractChain?: Chain) => {
  switch (contractChain?.id) {
    case pulseChain.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case chain.goerli.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case chain.polygonMumbai.id:
    case bscTestnet.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case avaxMainnet.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case ethwMainnet.id:
    case bscMainnet.id:
    case polygonMainnet.id:
    case evmosMainnet.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case moonbeamMainnet.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case chain.mainnet.id:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: 1,
      };
    default:
      return {
        addressOrName: "0x6a4671C5A490Af6Bb1FD157B6B3559e12412f49d",
        contractInterface: XENCryptoABI,
        chainId: 4,
      };
  }
};
