import {
  IconAnchor,
  IconAward,
  IconBed,
  IconBox,
  IconBriefcase,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconBuildingWarehouse,
  IconBulb,
  IconCertificate,
  IconChartBar,
  IconChefHat,
  IconClipboardCheck,
  IconClock,
  IconCoin,
  IconCup,
  IconDiamond,
  IconDroplet,
  IconGlobe,
  IconHammer,
  IconHeartHandshake,
  IconHome2,
  IconLeaf,
  IconPackage,
  IconPalette,
  IconPlane,
  IconSearch,
  IconShieldCheck,
  IconShip,
  IconShoppingCart,
  IconSofa,
  IconSparkles,
  IconStar,
  IconTarget,
  IconTools,
  IconToolsKitchen2,
  IconTruckDelivery,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";

// Icons the admin can choose from. The key is what gets stored in the database.
export const ICONS = {
  bed: IconBed,
  kitchen: IconToolsKitchen2,
  skyscraper: IconBuildingSkyscraper,
  chef: IconChefHat,
  package: IconPackage,
  store: IconBuildingStore,
  home: IconHome2,
  community: IconBuildingCommunity,
  warehouse: IconBuildingWarehouse,
  target: IconTarget,
  shield: IconShieldCheck,
  truck: IconTruckDelivery,
  ship: IconShip,
  plane: IconPlane,
  anchor: IconAnchor,
  hammer: IconHammer,
  tools: IconTools,
  search: IconSearch,
  clipboard: IconClipboardCheck,
  world: IconWorld,
  globe: IconGlobe,
  handshake: IconHeartHandshake,
  users: IconUsers,
  briefcase: IconBriefcase,
  chart: IconChartBar,
  coin: IconCoin,
  clock: IconClock,
  award: IconAward,
  certificate: IconCertificate,
  star: IconStar,
  diamond: IconDiamond,
  sparkles: IconSparkles,
  leaf: IconLeaf,
  droplet: IconDroplet,
  box: IconBox,
  cart: IconShoppingCart,
  sofa: IconSofa,
  cup: IconCup,
  bulb: IconBulb,
  palette: IconPalette,
} as const;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];
export const isIcon = (v: unknown): v is IconName => typeof v === "string" && v in ICONS;

export function SiteIcon({
  name,
  size = 30,
  stroke = 1.2,
  className,
}: {
  name?: string | null;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const Cmp = ICONS[isIcon(name) ? name : "package"];
  return <Cmp size={size} stroke={stroke} className={className} />;
}
