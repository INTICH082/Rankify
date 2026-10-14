'use client';

import { useState } from 'react';
import { BoostModeSwitcher, type BoostMode } from './BoostModeSwitcher';
import { OrderBoostCalculator } from './OrderBoostCalculator';
import { BoostOrdersFeed } from './BoostOrdersFeed';
import { INITIAL_FEED_ORDERS } from './boost-data';

export function BoostHub() {
  const [mode, setMode] = useState<BoostMode>('order');

  return (
    <div className="w-full">
      {/* Переключатель режимов: Заказать буст / Биржа заказов */}
      <BoostModeSwitcher
        mode={mode}
        onModeChange={setMode}
        openOrdersCount={INITIAL_FEED_ORDERS.length}
      />

      {/* Контент активного режима */}
      {mode === 'order' ? <OrderBoostCalculator /> : <BoostOrdersFeed />}
    </div>
  );
}
