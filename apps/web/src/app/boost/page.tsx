import { BoostHub } from '@/components/boost/BoostHub';

export const metadata = {
  title: 'Rankify — Услуги буста',
  description: 'Калькулятор буста и биржа заказов для игроков и бустеров Dota 2 и CS2.',
};

export default function BoostPage() {
  return (
    <main className="min-h-screen">
      <BoostHub />
    </main>
  );
}
