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
    case chain.goerli.id:
      return {
        addressOrName: "0x76f01394144a45741efccda993837368d8031456",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case chain.polygonMumbai.id:
    case bscTestnet.id:
      return {
        addressOrName: "0x2b8f075c8b4c88276e8846052a9ec18c2f253f0b",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case avaxMainnet.id:
      return {
        addressOrName: "0xC0C5AA69Dbe4d6DDdfBc89c0957686ec60F24389",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case ethwMainnet.id:
    case bscMainnet.id:
    case polygonMainnet.id:
    case evmosMainnet.id:
      return {
        addressOrName: "0x2AB0e9e4eE70FFf1fB9D67031E44F6410170d00e",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case moonbeamMainnet.id:
      return {
        addressOrName: "0xb564A5767A00Ee9075cAC561c427643286F8F4E1",
        contractInterface: XENCryptoABI,
        chainId: contractChain.id,
      };
    case chain.mainnet.id:
      return {
        addressOrName: "0x2b8f075c8b4c88276e8846052A9eC18c2f253F0b",
        contractInterface: XENCryptoABI,
        chainId: 1,
      };
    default:
      return {
        addressOrName: "0x76f01394144a45741efccda993837368d8031456",
        contractInterface: XENCryptoABI,
        chainId: 4,
      };
  }
};