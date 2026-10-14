/**
 * Enum of supported games on Rankify platform
 */
export enum GameType {
  DOTA2 = 'DOTA2',
  CS2 = 'CS2',
  VALORANT = 'VALORANT',
  LEAGUE_OF_LEGENDS = 'LEAGUE_OF_LEGENDS',
  APEX_LEGENDS = 'APEX_LEGENDS',
  OVERWATCH2 = 'OVERWATCH2',
}

/**
 * Types of services available on the marketplace
 */
export enum ServiceType {
  RANK_BOOST = 'RANK_BOOST',
  CALIBRATION = 'CALIBRATION',
  WIN_BOOST = 'WIN_BOOST',
  COACHING = 'COACHING',
  ACCOUNT_SALE = 'ACCOUNT_SALE',
}

/**
 * Lifecycle states of an order
 */
export enum OrderStatus {
  CREATED = 'CREATED',                     // Created, waiting for payment/escrow deposit
  PENDING_BOOSTER = 'PENDING_BOOSTER',     // Paid into escrow, open on the marketplace
  ASSIGNED = 'ASSIGNED',                   // Booster accepted/chosen
  IN_PROGRESS = 'IN_PROGRESS',             // Booster currently executing order
  COMPLETED_PENDING_REVIEW = 'COMPLETED_PENDING_REVIEW', // Booster submitted proofs
  CONFIRMED = 'CONFIRMED',                 // Client verified & confirmed, escrow released
  DISPUTED = 'DISPUTED',                   // Sent to arbitration/moderation
  CANCELLED = 'CANCELLED',                 // Cancelled with refund according to rules
}

/**
 * Escrow transaction status
 */
export enum EscrowStatus {
  HOLDING = 'HOLDING',
  RELEASED = 'RELEASED',
  REFUNDED = 'REFUNDED',
}

/**
 * User roles in the platform
 */
export enum UserRole {
  USER = 'USER',                           // Can both order and boost
  MODERATOR = 'MODERATOR',                 // Handles disputes & content
  ADMIN = 'ADMIN',                         // Full platform access
}

/**
 * Public User profile representation
 */
export interface PublicUser {
  id: string;
  username: string;
  avatarUrl?: string;
  rating: number;
  completedOrdersAsBooster: number;
  completedOrdersAsClient: number;
  isVerified: boolean;
  createdAt: string;
}

/**
 * Order details contract
 */
export interface Order {
  id: string;
  title: string;
  description?: string;
  game: GameType;
  serviceType: ServiceType;
  status: OrderStatus;
  price: number;
  currency: string;
  clientId: string;
  boosterId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Real-time chat message contract
 */
export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  text: string;
  attachments?: string[];
  createdAt: string;
}
