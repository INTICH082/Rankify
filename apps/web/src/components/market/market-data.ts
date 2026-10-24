export type MarketViewMode = 'list' | 'grid-2' | 'grid-3';

export type GameFilter = 'all' | 'dota2' | 'cs2';

export interface MarketSeller {
  id: string;
  username: string;
  avatarUrl?: string;
  rating: number; // e.g. 5.0
  salesCount: number;
  isOnline: boolean;
}

export interface MarketListing {
  id: string;
  gameId: 'dota2' | 'cs2';
  subType?: 'premier' | 'faceit' | 'regular';
  title: string;
  price: number; // in RUB
  currency: string;
  rankTitle: string; // e.g. "Титан 5,900 MMR" or "10 lvl (2,240 Elo)" or "18,500 CS Rating"
  ratingValue?: number;
  inventoryValue: number; // in RUB (e.g. 14500 ₽)
  inventoryHighlights?: string[]; // e.g. ["Нож Складной", "AWP Азимов", "Аркана СФ"]
  hasPrime: boolean;
  hasNativeEmail: boolean;
  inactivityDays: number; // отлега в днях (0 = активный, 45 = 45 дней без входа)
  hoursPlayed: number;
  warrantyHours: number; // 24ч, 48ч, 168ч (7 дней)
  hasVacBan: boolean;
  behaviorScore?: number; // for Dota 2 (e.g. 12000)
  createdAt: string;
  seller: MarketSeller;
}

export interface MarketFiltersState {
  searchQuery: string;
  game: GameFilter;
  minPrice: string;
  maxPrice: string;
  onlyPrime: boolean;
  onlyNativeEmail: boolean;
  onlyNoVac: boolean;
  withInventory: boolean;
  minInactivityDays: number; // 0 = any, 7 = >7 days, 30 = >30 days
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'inventory_desc' | 'inactivity_desc';
}

export const INITIAL_MARKET_FILTERS: MarketFiltersState = {
  searchQuery: '',
  game: 'all',
  minPrice: '',
  maxPrice: '',
  onlyPrime: false,
  onlyNativeEmail: false,
  onlyNoVac: true,
  withInventory: false,
  minInactivityDays: 0,
  sortBy: 'newest',
};

export const INITIAL_MARKET_LISTINGS: MarketListing[] = [
  {
    id: 'lot-1',
    gameId: 'cs2',
    subType: 'faceit',
    title: 'CS2 Prime • 10 LVL FACEIT (2,310 Elo) + Нож Flip Knife Vanilla • Родная почта',
    price: 9800,
    currency: 'RUB',
    rankTitle: '10 lvl (2,310 Elo)',
    ratingValue: 2310,
    inventoryValue: 24500,
    inventoryHighlights: ['Flip Knife Vanilla', 'AK-47 Азимов', 'AWP Неонуар'],
    hasPrime: true,
    hasNativeEmail: true,
    inactivityDays: 34,
    hoursPlayed: 2450,
    warrantyHours: 48,
    hasVacBan: false,
    createdAt: '15 минут назад',
    seller: {
      id: 'sel-1',
      username: 'ApexStore',
      rating: 5.0,
      salesCount: 342,
      isOnline: true,
    },
  },
  {
    id: 'lot-2',
    gameId: 'dota2',
    subType: 'regular',
    title: 'Dota 2 • Титан (Immortal 6,100 MMR) • Порядочность 12,000 • 3 Арканы',
    price: 6400,
    currency: 'RUB',
    rankTitle: 'Титан (6,100 MMR)',
    ratingValue: 6100,
    inventoryValue: 16800,
    inventoryHighlights: ['Arcana Shadow Fiend', 'Arcana Pudge', 'Arcana Juggernaut'],
    hasPrime: true,
    hasNativeEmail: true,
    inactivityDays: 52,
    hoursPlayed: 4100,
    warrantyHours: 72,
    hasVacBan: false,
    behaviorScore: 12000,
    createdAt: '40 минут назад',
    seller: {
      id: 'sel-2',
      username: 'DotaMarketGod',
      rating: 4.9,
      salesCount: 819,
      isOnline: true,
    },
  },
  {
    id: 'lot-3',
    gameId: 'cs2',
    subType: 'premier',
    title: 'CS2 Prime • 21,400 CS Rating (Розовый) • Родная почта • Большой инвентарь',
    price: 4900,
    currency: 'RUB',
    rankTitle: '21,400 CS Rating',
    ratingValue: 21400,
    inventoryValue: 12000,
    inventoryHighlights: ['Desert Eagle Поток информации', 'M4A4 Император'],
    hasPrime: true,
    hasNativeEmail: true,
    inactivityDays: 18,
    hoursPlayed: 1650,
    warrantyHours: 24,
    hasVacBan: false,
    createdAt: '1 час назад',
    seller: {
      id: 'sel-3',
      username: 'Valera_Boost',
      rating: 5.0,
      salesCount: 154,
      isOnline: false,
    },
  },
  {
    id: 'lot-4',
    gameId: 'dota2',
    subType: 'regular',
    title: 'Dota 2 • Властелин IV (4,250 MMR) • Родная почта • Идеально под мейн',
    price: 2600,
    currency: 'RUB',
    rankTitle: 'Властелин IV (4,250 MMR)',
    ratingValue: 4250,
    inventoryValue: 3200,
    inventoryHighlights: ['Immortal плечи SF', 'Immortal хук Pudge'],
    hasPrime: true,
    hasNativeEmail: true,
    inactivityDays: 85,
    hoursPlayed: 1980,
    warrantyHours: 168,
    hasVacBan: false,
    behaviorScore: 10500,
    createdAt: '2 часа назад',
    seller: {
      id: 'sel-4',
      username: 'SteamLegend',
      rating: 4.8,
      salesCount: 67,
      isOnline: true,
    },
  },
  {
    id: 'lot-5',
    gameId: 'cs2',
    subType: 'premier',
    title: 'CS2 Prime • 14,800 Premier Rating • Медали за службу • Отлега 120 дней',
    price: 1850,
    currency: 'RUB',
    rankTitle: '14,800 CS Rating',
    ratingValue: 14800,
    inventoryValue: 1400,
    inventoryHighlights: ['AK-47 Красная линия'],
    hasPrime: true,
    hasNativeEmail: false,
    inactivityDays: 120,
    hoursPlayed: 1200,
    warrantyHours: 24,
    hasVacBan: false,
    createdAt: '3 часа назад',
    seller: {
      id: 'sel-5',
      username: 'FastBuyer',
      rating: 4.9,
      salesCount: 412,
      isOnline: true,
    },
  },
  {
    id: 'lot-6',
    gameId: 'dota2',
    subType: 'regular',
    title: 'Dota 2 • Смурф с открытым рейтингом (100 часов) • Порядочность 12,000',
    price: 990,
    currency: 'RUB',
    rankTitle: 'Калибровка доступна',
    ratingValue: 0,
    inventoryValue: 500,
    inventoryHighlights: [],
    hasPrime: true,
    hasNativeEmail: true,
    inactivityDays: 14,
    hoursPlayed: 110,
    warrantyHours: 24,
    hasVacBan: false,
    behaviorScore: 12000,
    createdAt: '4 часа назад',
    seller: {
      id: 'sel-6',
      username: 'SmurfKing',
      rating: 5.0,
      salesCount: 1280,
      isOnline: true,
    },
  },
];
