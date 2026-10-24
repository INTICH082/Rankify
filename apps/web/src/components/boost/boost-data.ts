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
  ratingUnit: string;
  step: number;
  minRating: number;
  maxRating: number;
  ranks: RankTier[];
  services: GameServiceConfig[];
  basePricePerStep: number;
}

export const CS2_FACEIT_CONFIG: GameConfig = {
  id: 'cs2_faceit',
  name: 'Counter-Strike 2 (Faceit)',
  ratingUnit: 'Elo',
  step: 25,
  minRating: 500,
  maxRating: 3000,
  ranks: [
    { id: 'lvl1', name: 'Level 1 (500-750)', value: 500, badgeColor: '#ffffff' },
    { id: 'lvl2', name: 'Level 2 (751-900)', value: 751, badgeColor: '#4caf50' },
    { id: 'lvl3', name: 'Level 3 (901-1050)', value: 901, badgeColor: '#4caf50' },
    { id: 'lvl4', name: 'Level 4 (1051-1200)', value: 1051, badgeColor: '#ffeb3b' },
    { id: 'lvl5', name: 'Level 5 (1201-1350)', value: 1201, badgeColor: '#ffeb3b' },
    { id: 'lvl6', name: 'Level 6 (1351-1530)', value: 1351, badgeColor: '#ffeb3b' },
    { id: 'lvl7', name: 'Level 7 (1531-1750)', value: 1531, badgeColor: '#ffeb3b' },
    { id: 'lvl8', name: 'Level 8 (1751-2000)', value: 1751, badgeColor: '#ff9800' },
    { id: 'lvl9', name: 'Level 9 (2001-2250)', value: 2001, badgeColor: '#ff9800' },
    { id: 'lvl10', name: 'Level 10 (2250 - 3000+)', value: 2250, badgeColor: '#f44336' },
  ],
  services: [
    { id: 'rank', title: 'Faceit Elo Boost', description: 'Поднятие уровня и Elo на Faceit', basePrice: 400 },
    { id: 'calibration', title: 'Калибровка аккаунта', description: 'Матчи на новом Faceit аккаунте', basePrice: 1900 },
    { id: 'wins', title: 'Победы (Net Wins)', description: 'Чистые победы на вашем уровне Faceit', basePrice: 350 },
    { id: 'coaching', title: 'Duo с тренером Faceit', description: 'Игра в пати с разбором позиционки', basePrice: 850 },
  ],
  basePricePerStep: 45, // за каждые 25 Elo
};

export const GAMES_CONFIG: Record<string, GameConfig> = {
  dota2: {
    id: 'dota2',
    name: 'Dota 2',
    ratingUnit: 'MMR',
    step: 100,
    minRating: 100,
    maxRating: 10000,
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
      { id: 'calibration', title: 'Калибровка аккаунта', description: 'Калибровочные матчи с высоким винрейтом', basePrice: 1600 },
      { id: 'wins', title: 'Победы (Net Wins)', description: 'Чистые победы без риска слива', basePrice: 250 },
      { id: 'coaching', title: 'Duo с тренером / Разбор', description: 'Игра в пати с разбором ошибок', basePrice: 700 },
    ],
    basePricePerStep: 140, // за каждые 100 MMR
  },
  cs2: {
    id: 'cs2',
    name: 'Counter-Strike 2',
    ratingUnit: 'CS Rating',
    step: 500,
    minRating: 1000,
    maxRating: 30000, // Планка поднята до 30,000
    ranks: [
      { id: 'gray', name: 'Серый (0 - 4,999)', value: 1000, badgeColor: '#9e9e9e' },
      { id: 'cyan', name: 'Голубой (5,000 - 9,999)', value: 5000, badgeColor: '#00bcd4' },
      { id: 'blue', name: 'Синий (10,000 - 14,999)', value: 10000, badgeColor: '#2196f3' },
      { id: 'purple', name: 'Фиолетовый (15,000 - 19,999)', value: 15000, badgeColor: '#9c27b0' },
      { id: 'pink', name: 'Розовый (20,000 - 24,999)', value: 20000, badgeColor: '#e91e63' },
      { id: 'red', name: 'Красный (25,000 - 29,999)', value: 25000, badgeColor: '#f44336' },
      { id: 'gold', name: 'Золотой (30,000+ World Elite)', value: 30000, badgeColor: '#ffd700' },
    ],
    services: [
      { id: 'rank', title: 'Premier CS Rating', description: 'Буст очков в Премьер-режиме', basePrice: 350 },
      { id: 'calibration', title: 'Калибровка 10 побед', description: 'Получение начального рейтинга', basePrice: 1800 },
      { id: 'wins', title: 'Победы (Net Wins)', description: 'Гарантированные победы в соревновательном', basePrice: 300 },
      { id: 'coaching', title: 'Duo лобби с тренером', description: 'Игра в пати с разбором раундов', basePrice: 800 },
    ],
    basePricePerStep: 280, // за каждые 500 рейтинга
  },
};

export interface FeedOrder {
  id: string;
  gameId: 'dota2' | 'cs2';
  subMode?: 'premier' | 'faceit';
  title: string;
  currentRank: string;
  targetRank: string;
  serviceType: string;
  isDuo: boolean;
  isExpress: boolean;
  price: number;
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
    subMode: 'premier',
    title: 'CS2 Premier: 14,500 ➔ 25,000 Rating',
    currentRank: 'Синий (14.5k)',
    targetRank: 'Красный (25k)',
    serviceType: 'Premier CS Rating',
    isDuo: false,
    isExpress: true,
    price: 6900,
    createdAt: '25 минут назад',
    customerName: 'AimbotGod',
    customerRating: 4.9,
  },
  {
    id: 'ord-103',
    gameId: 'cs2',
    subMode: 'faceit',
    title: 'CS2 Faceit: 5 lvl ➔ 8 lvl (1250 ➔ 1800 Elo)',
    currentRank: '5 lvl (1250 Elo)',
    targetRank: '8 lvl (1800 Elo)',
    serviceType: 'Faceit Elo Boost',
    isDuo: true,
    isExpress: false,
    price: 4200,
    createdAt: '35 минут назад',
    customerName: 's1mple_fan',
    customerRating: 5.0,
  },
  {
    id: 'ord-104',
    gameId: 'dota2',
    title: 'Dota 2: Калибровка 10 матчей',
    currentRank: 'Калибровка',
    targetRank: '10 калибровочных игр',
    serviceType: 'Калибровка аккаунта',
    isDuo: false,
    isExpress: false,
    price: 1850,
    createdAt: '40 минут назад',
    customerName: 'InvokerMid',
    customerRating: 5.0,
  },
  {
    id: 'ord-105',
    gameId: 'cs2',
    subMode: 'premier',
    title: 'CS2: Duo буст в пати (5 побед)',
    currentRank: '21,200 Rating',
    targetRank: '+5 Чистых побед',
    serviceType: 'Победы в пати',
    isDuo: true,
    isExpress: true,
    price: 2400,
    createdAt: '1 час назад',
    customerName: 'MirageKing',
    customerRating: 4.8,
  },
  {
    id: 'ord-106',
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
