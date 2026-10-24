import { MarketHub } from '@/components/market/MarketHub';

export const metadata = {
  title: 'Rankify — Торговая площадка',
  description: 'Покупка и продажа игровых аккаунтов Dota 2 и Counter-Strike 2 с защитой Escrow.',
};

export default function MarketPage() {
  return (
    <main className="min-h-screen">
      <MarketHub />
    </main>
  );
}
