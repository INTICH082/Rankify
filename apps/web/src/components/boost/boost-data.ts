export interface RankTier {
  id: string;
  name: string;
  value: number; // MMR or rating threshold
  badgeColor: string;
}

export interface GameServiceConfig {
  id: 'rank' | 'calibration' | 'wins' | 'coaching';
  title: string;
  description: string;
  basePrice: number;
}

export interface GameConfig {
  id: string;
  name: string;
  tagline: string;
  iconName: string; // for dynamic or static icon display
  ratingUnit: string; // 'MMR' or 'Premier Rating'
  step: number;
  minRating: number;
  maxRating: number;
  ranks: RankTier[];
  services: GameServiceConfig[];
  basePricePerStep: number;
}

/**
 * Extensible Game Registry.
 * Adding any new game (Valorant, LoL, Apex) in the future requires only 1 object in this record!
 */
export const GAMES_CONFIG: Record<string, GameConfig> = {
  dota2: {
    id: 'dota2',
    name: 'Dota 2',
    tagline: 'MMR буст, калибровка и отмыв порядочности',
    iconName: 'Gamepad2',
    ratingUnit: 'MMR',
    step: 100,
    minRating: 100,
    maxRating: 8000,
    ranks: [
      { id: 'herald', name: 'Рекрут (Herald)', value: 0, badgeColor: '#8a8d91' },
      { id: 'guardian', name: 'Страж (Guardian)', value: 770, badgeColor: '#5c7e52' },
      { id: 'crusader', name: 'Рыцарь (Crusader)', value: 1540, badgeColor: '#3d85c6' },
      { id: 'archon', name: 'Герой (Archon)', value: 2310, badgeColor: '#b45f06' },
      { id: 'legend', name: 'Легенда (Legend)', value: 3080, badgeColor: '#c27ba0' },
      { id: 'ancient', name: 'Властелин (Ancient)', value: 3850, badgeColor: '#674ea7' },
      { id: 'divine', name: 'Божество (Divine)', value: 4620, badgeColor: '#d5a6bd' },
      { id: 'immortal', name: 'Титан (Immortal)', value: 5620, badgeColor: '#e06666' },
    ],
    services: [
      { id: 'rank', title: 'Поднятие рейтинга (MMR)', description: 'Буст до желаемого звания', basePrice: 200 },
      { id: 'calibration', title: 'Калибровка аккаунта', description: '10 калибровочных матчей с высоким винрейтом', basePrice: 1600 },
      { id: 'wins', title: 'Победы (Net Wins)', description: 'Чистые победы без риска слива', basePrice: 250 },
      { id: 'coaching', title: 'Duo с тренером / Разбор', description: 'Игра в пати с разбором ошибок', basePrice: 700 },
    ],
    basePricePerStep: 140, // за каждые 100 MMR
  },
  cs2: {
    id: 'cs2',
    name: 'Counter-Strike 2',
    tagline: 'Premier Rating, Faceit Elo и соревновательный ранг',
    iconName: 'Crosshair',
    ratingUnit: 'CS Rating',
    step: 500,
    minRating: 1000,
    maxRating: 25000,
    ranks: [
      { id: 'gray', name: 'Серый (0 - 4,999)', value: 1000, badgeColor: '#9e9e9e' },
      { id: 'cyan', name: 'Бирюзовый (5,000 - 9,999)', value: 5000, badgeColor: '#00bcd4' },
      { id: 'blue', name: 'Синий (10,000 - 14,999)', value: 10000, badgeColor: '#2196f3' },
      { id: 'purple', name: 'Фиолетовый (15,000 - 19,999)', value: 15000, badgeColor: '#9c27b0' },
      { id: 'pink', name: 'Розовый (20,000 - 24,999)', value: 20000, badgeColor: '#e91e63' },
      { id: 'red', name: 'Красный (25,000+)', value: 25000, badgeColor: '#f44336' },
    ],
    services: [
      { id: 'rank', title: 'Premier CS Rating', description: 'Буст очков в Премьер-режиме', basePrice: 350 },
      { id: 'calibration', title: 'Калибровка 10 побед', description: 'Получение начального рейтинга', basePrice: 1800 },
      { id: 'wins', title: 'Победы (Net Wins)', description: 'Гарантированные победы в соревновательном', basePrice: 300 },
      { id: 'coaching', title: 'Duo лобби с бустером', description: 'Игра в пати без передачи аккаунта', basePrice: 800 },
    ],
    basePricePerStep: 300, // за каждые 500 рейтинга
  },
};

export interface FeedOrder {
  id: string;
  gameId: 'dota2' | 'cs2';
  title: string;
  currentRank: string;
  targetRank: string;
  serviceType: string;
  isDuo: boolean;
  isExpress: boolean;
  price: number; // вознаграждение бустера
  createdAt: string;
  customerName: string;
  customerRating: number;
}

export const INITIAL_FEED_ORDERS: FeedOrder[] = [
  {
    id: 'ord-101',
    gameId: 'dota2',
    title: 'Dota 2: с 2,400 до 3,600 MMR',
    currentRank: 'Герой II',
    targetRank: 'Легенда III',
    serviceType: 'Поднятие рейтинга',
    isDuo: true,
    isExpress: true,
    price: 3450,
    createdAt: '12 минут назад',
    customerName: 'ShadowFiendPro',
    customerRating: 5.0,
  },
  {
    id: 'ord-102',
    gameId: 'cs2',
    title: 'CS2 Premier: 8,500 ➔ 15,000 Rating',
    currentRank: 'Бирюзовый (8.5k)',
    targetRank: 'Фиолетовый (15k)',
    serviceType: 'Premier CS Rating',
    isDuo: false,
    isExpress: false,
    price: 4900,
    createdAt: '25 минут назад',
    customerName: 'AimbotGod',
    customerRating: 4.9,
  },
  {
    id: 'ord-103',
    gameId: 'dota2',
    title: 'Dota 2: Калибровка 10 матчей',
    currentRank: 'Калибровка',
    targetRank: 'Максимальный результат',
    serviceType: 'Калибровка аккаунта',
    isDuo: false,
    isExpress: false,
    price: 1850,
    createdAt: '40 минут назад',
    customerName: 'InvokerMid',
    customerRating: 5.0,
  },
  {
    id: 'ord-104',
    gameId: 'cs2',
    title: 'CS2: Duo буст в пати (5 побед)',
    currentRank: '11,200 Rating',
    targetRank: '+5 Чистых побед',
    serviceType: 'Победы в пати',
    isDuo: true,
    isExpress: true,
    price: 2100,
    createdAt: '1 час назад',
    customerName: 'MirageKing',
    customerRating: 4.8,
  },
  {
    id: 'ord-105',
    gameId: 'dota2',
    title: 'Dota 2: Властелин IV ➔ Титан',
    currentRank: '4,400 MMR',
    targetRank: '5,620 MMR',
    serviceType: 'Поднятие рейтинга',
    isDuo: false,
    isExpress: true,
    price: 5800,
    createdAt: '2 часа назад',
    customerName: 'KunkkaMain',
    customerRating: 5.0,
  },
];
