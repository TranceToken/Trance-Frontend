import {
  BookOpenIcon,
  ViewGridIcon,
  LockClosedIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import {
  DuneIcon,
  TwitterIcon,
  TelegramIcon,
  GitHubIcon,
  DiamondIcon,
  DiscordIcon,
  CoinmarketCapIcon,
  EthereumIcon,
  PulseChainIcon,
  PolygonIcon,
  AvalancheIcon,
  BinanceSmartChainIcon,
  EthereumPOWIcon,
  EVMOSIcon,
  MoonbeamIcon,
} from "~/components/Icons";

export const chainIcons: Record<number, JSX.Element> = {
  1: <EthereumIcon />,
  5: <EthereumIcon />,
  56: <BinanceSmartChainIcon />,
  97: <BinanceSmartChainIcon />,
  137: <PolygonIcon />,
  941: <PulseChainIcon />,
  1284: <MoonbeamIcon />,
  9001: <EVMOSIcon />,
  10001: <EthereumPOWIcon />,
  43114: <AvalancheIcon />,
  80001: <PolygonIcon />,
};

export const navigationItems = [
  {
    id: 0,
    name: "Dashboard",
    icon: <ViewGridIcon className="h-5 w-5" />,
    href: "/dashboard",
    canDisable: false,
  },
  {
    id: 1,
    name: "Mint",
    icon: <DiamondIcon />,
    href: "/mint",
    canDisable: true,
  },
  {
    id: 2,
    name: "Stake",
    icon: <LockClosedIcon className="h-5 w-5" />,
    href: "/stake",
    canDisable: true,
  },
];

export const textLinkItems = [
  {
    name: "Developer",
    href: "http://twitter.com/joeblau",
  },

  {
    name: "Website Source Code",
    href: "https://github.com/joeblau/xenfyi",
  },
];

export const linkItems = [
  {
    name: "Whitepaper",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    href: "https://docs.google.com/document/d/1QImFUCpWrxem413JfHxilgiSekml2JsVVFyD77e29x0/edit?usp=sharing",
  },
/*   {
    name: "Docs",
    icon: <BookOpenIcon className="h-5 w-5" />,
    href: "https://xensource.gitbook.io/www.xenpedia.io/",
  }, */
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    href: "https://twitter.com/TranceTokenPLS",
  },
  {
    name: "Telegram",
    icon: <TelegramIcon />,
    href: "https://t.me/+9tv24KmC4tA0YmU5",
  },
  {
    name: "Discord",
    icon: <DiscordIcon />,
    href: "https://discord.gg/6wFv3hrE8p",
  },
  {
    name: "GitHub",
    icon: <GitHubIcon />,
    href: "https://github.com/TranceToken",
  },
/*   {
    name: "CoinMarketCap",
    icon: <CoinmarketCapIcon />,
    href: "https://coinmarketcap.com/currencies/xen-crypto/",
  },
  {
    name: "Dune Analytics",
    icon: <DuneIcon />,
    href: "https://dune.com/sixdegree/xen-crypto-overview",
  }, */
];
